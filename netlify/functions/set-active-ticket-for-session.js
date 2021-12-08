const setActiveTicketForSession = require('./services/jira/set-active-ticket-for-session')

exports.handler = async function (event) {
  try {
    const eventBody = JSON.parse(event.body)

    if (!eventBody.name) {
      return {
        statusCode: 400
      }
    }

    const session = await setActiveTicketForSession(
      eventBody.name,
      eventBody.ticketId
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
