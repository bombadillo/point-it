const { createClient } = require('@supabase/supabase-js')
const mapSessionToResponse = require('./services/session/map-session-to-response')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

exports.handler = async function (event) {
    try {
        const sessionName = event.queryStringParameters.name

        if (!sessionName || !sessionName === '') {
            return {
                statusCode: 400
            }
        }

        const session = await getSession(sessionName)

        if (session) {
            const mappedSession = mapSessionToResponse(session)
            return {
                statusCode: 200,
                body: JSON.stringify(mappedSession)
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
    const { data, error } = await supabase
        .from('session')
        .select()
        .eq('name', name)
        .limit(1)
        .single()

    if (error) return null
    return data
}
