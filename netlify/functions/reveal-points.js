const revealPoints = require('./services/session/reveal-points')

exports.handler = async function (event) {
  try {
    const eventBody = JSON.parse(event.body)

    if (!eventBody.name) {
      return {
        statusCode: 400
      }
    }

    const session = await revealPoints(
      eventBody.name
    )

    if (session) {
      return {
        statusCode: 200,
        body: JSON.stringify(session.data)
      }
    }

    console.log('no session')

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
