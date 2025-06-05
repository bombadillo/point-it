const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

exports.handler = async function (event) {
    try {
        const eventBody = JSON.parse(event.body)

        if (!eventBody.name || !eventBody.user || !eventBody.points) {
            return {
                statusCode: 400
            }
        }

        const session = await addPointsToActiveTicket(
            eventBody.name,
            eventBody.user,
            eventBody.points
        )

        if (session) {
            return {
                statusCode: 200,
                body: JSON.stringify(session)
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

async function addPointsToActiveTicket(name, user, points) {
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

    if (!userExists) {
        console.log('user does not exist')
        return null
    }

    let usersPointed = 0
    users.forEach((currentUserInArray) => {
        if (currentUserInArray.name === user.name) {
            currentUserInArray.points = points
        }

        if (currentUserInArray.points) {
            usersPointed++
        }
    })

    const updatedSession = {
        ...sessionRecord,
        users,
        all_users_pointed: usersPointed === users.length,
        points_are_unanimous: pointsAreUnanimous(users),
        grooming_successful: pointsAreUnanimous(users),
        agreed_points: pointsAreUnanimous(users) ? points : undefined
    }

    const { data, error: updateError } = await supabase
        .from('session')
        .update(updatedSession)
        .eq('name', name)
        .select()
        .single()

    if (updateError) {
        console.error('Error updating session:', updateError)
        return null
    }

    return data
}

function pointsAreUnanimous(users) {
    const userPoints = []
    users.forEach((user) => {
        if (!userPoints.includes(user.points)) {
            console.log('adding point')
            userPoints.push(user.points)
        }
    })

    return userPoints.length === 1
}
