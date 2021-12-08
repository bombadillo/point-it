const faunadb = require('faunadb'),
  q = faunadb.query

const completeJiraTicket = require('./services/jira/complete-jira-ticket')
const markActiveTicketForSessionAsGroomed = require('./services/jira/mark-active-ticket-for-session-as-groomed')

let client

exports.handler = async function (event) {
  try {
    client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
      domain: 'db.eu.fauna.com',
      keepAlive: false
    })

    const eventBody = JSON.parse(event.body)

    if (
      !eventBody.name ||
      !eventBody.user ||
      !eventBody.points ||
      !eventBody.activeTicketId
    ) {
      return {
        statusCode: 400
      }
    }

    const session = await addPointsToActiveTicket(
      eventBody.name,
      eventBody.user,
      eventBody.points,
      eventBody.activeTicketId
    )

    if (session) {
      return {
        statusCode: 200,
        body: JSON.stringify(session.data)
      }
    }

    return {
      statusCode: 404
    }
  } catch (e) {
    console.log(e)

    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

async function addPointsToActiveTicket(name, user, points, activeTicketId) {
  const sessionResults = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('session_name'), name), { size: 1 }),
      q.Lambda((x) => q.Get(x))
    )
  )

  if (sessionResults.data.length === 0) {
    return
  }

  const sessionRecord = sessionResults.data[0]

  const users = sessionRecord.data.users

  const userExists = users.filter((x) => x.name === user.name).length > 0

  if (!userExists) {
    null
  }

  let usersPointed = 0
  users.forEach((item) => {
    if (item.name === user.name) {
      item.points = points
    }

    if (item.points) {
      usersPointed++
    }
  })

  sessionRecord.data.allUsersPointed = usersPointed === users.length

  if (pointsAreUnanimous(users)) {
    sessionRecord.data.pointsAreUnanimous = true
    await completeJiraTicket(activeTicketId, points)
    await markActiveTicketForSessionAsGroomed(name)

    return sessionRecord
  } else {
    sessionRecord.data.pointsAreUnanimous = false
  }

  sessionRecord.data.users = users

  return await client.query(
    q.Update(q.Ref(q.Collection('session'), sessionRecord.ref.id), {
      data: { ...sessionRecord.data }
    })
  )
}

function pointsAreUnanimous(users) {
  const userPoints = []
  users.forEach((user) => {
    if (!userPoints.includes(user.points)) {
      console.log('adding point')
      userPoints.push(user.points)
    }
  })

  return userPoints.length === 1
}
