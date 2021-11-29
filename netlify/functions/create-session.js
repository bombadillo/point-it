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

    const session = await addSession(eventBody.sessionName)

    return {
      statusCode: 200,
      body: JSON.stringify(session)
    }
  } catch (e) {
    console.log(e)

    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}

async function addSession(sessionName) {
  await client.query(
    q.Create(q.Collection('session'), {
      data: { name: sessionName }
    })
  )
}
