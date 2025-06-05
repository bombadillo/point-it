const groomNextTicket = require('./services/session/groom-next-ticket')
const mapSessionToResponse = require('./services/session/map-session-to-response')

exports.handler = async function (event) {
    try {
        const eventBody = JSON.parse(event.body)

        if (!eventBody.name) {
            return {
                statusCode: 400
            }
        }

        const session = await groomNextTicket(eventBody.name)

        if (session) {
            return {
                statusCode: 200,
                body: JSON.stringify(mapSessionToResponse(session))
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
