const faunadb = require('faunadb'),
  q = faunadb.query

let client

module.exports = async (name) => {
  client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET,
    domain: 'db.eu.fauna.com',
    keepAlive: false
  })

  const sessionResults = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('session_name'), name), { size: 1 }),
      q.Lambda((x) => q.Get(x))
    )
  )

  if (sessionResults.data.length === 0) {
    console.log('no session found to mark as groomed')
    return
  }

  const sessionRecord = sessionResults.data[0]

  const updatedSession = {
    name: sessionRecord.data.name,
    users: sessionRecord.data.users,
    groomingSuccessful: true
  }

  updatedSession.users.forEach((item) => {
    delete item.points
  })

  return await client.query(
    q.Replace(q.Ref(q.Collection('session'), sessionRecord.ref.id), {
      data: updatedSession
    })
  )
}
