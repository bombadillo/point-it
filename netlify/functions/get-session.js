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

    const sessionName = event.queryStringParameters.name

    if (!sessionName || !sessionName === '') {
      return {
        statusCode: 400
      }
    }

    const session = await getSession(sessionName)

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

async function getSession(name) {
  const sessionResults = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('session_name'), name), { size: 1 }),
      q.Lambda(x => q.Get(x))
    )
  )

  if (sessionResults.data.length === 0) {
    return
  }

  return sessionResults.data[0]
}
