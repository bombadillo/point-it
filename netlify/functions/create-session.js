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

    const session = await addSession(eventBody.name, eventBody.user)

    if (session) {
      return {
        statusCode: 200,
        body: JSON.stringify(session.data)
      }
    }

    return {
      statusCode: 409
    }
  } catch (e) {
    console.log(e)

    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

async function addSession(sessionName, user) {
  if (await sessionExists(sessionName)) {
    return null
  }

  return await client.query(
    q.Create(q.Collection('session'), {
      data: { name: sessionName, users: [user] }
    })
  )
}

async function sessionExists(sessionName) {
  const sessionResults = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('session_name'), sessionName), { size: 1 }),
      q.Lambda(x => q.Get(x))
    )
  )

  return sessionResults.data.length > 0
}
