const { createClient } = require('@supabase/supabase-js')
const mapSessionToResponse = require('./services/session/map-session-to-response')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

exports.handler = async function (event) {
    try {
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
                body: JSON.stringify(mapSessionToResponse(session))
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
    const { data: sessionRecord, error } = await supabase
        .from('session')
        .select()
        .eq('name', name)
        .limit(1)
        .single()

    if (error || !sessionRecord) {
        return null
    }

    const users = sessionRecord.users
    const userExists = users.some((x) => x.name === user.name)

    if (userExists) {
        return sessionRecord
    }

    users.push(user)

    const { data, error: updateError } = await supabase
        .from('session')
        .update({ users })
        .eq('name', name)
        .select()
        .single()

    if (updateError) {
        console.error('Error updating session:', updateError)
        return null
    }

    return data
}
