const faunadb = require('faunadb'),
  q = faunadb.query

let client

module.exports = async (name, ticketId) => {
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
    return
  }

  const sessionRecord = sessionResults.data[0]

  const updatedSession = {
    name: sessionRecord.data.name,
    users: sessionRecord.data.users
  }

  if (ticketId) {
    updatedSession.activeTicketId = ticketId
  } else {
    delete updatedSession.activeTicketId
  }

  updatedSession.users.forEach((item) => {
    delete item.points
  })

  console.log('setting active ticket')
  console.log(updatedSession)

  return await client.query(
    q.Replace(q.Ref(q.Collection('session'), sessionRecord.ref.id), {
      data: updatedSession
    })
  )
}
