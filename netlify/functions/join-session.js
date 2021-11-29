const faunadb = require('faunadb'),
  q = faunadb.query

let client

exports.handler = async function (event) {
  try {
    client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
      domain: 'db.eu.fauna.com',
      keepAlive: false
    })

    const eventBody = JSON.parse(event.body)

    if (!eventBody.name || !eventBody.user) {
      return {
        statusCode: 400
      }
    }

    const session = await joinSession(eventBody.name, eventBody.user)

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

async function joinSession(name, user) {
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

  if (userExists) {
    return sessionRecord
  }

  users.push(user)
  sessionRecord.data.users = users

  return await client.query(
    q.Update(q.Ref(q.Collection('session'), sessionRecord.ref.id), {
      data: { ...sessionRecord.data }
    })
  )
}
