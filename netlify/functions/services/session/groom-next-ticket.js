const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

module.exports = async (name) => {
    const { data: sessionRecord, error } = await supabase
        .from('session')
        .select()
        .eq('name', name)
        .limit(1)
        .single()

    if (error || !sessionRecord) {
        console.log('no session found to mark as groomed')
        return
    }

    // Reset points for all users
    sessionRecord.users.forEach((user) => (user.points = undefined))

    const updatedSession = {
        ...sessionRecord,
        grooming_successful: false,
        all_users_pointed: false,
        points_are_unanimous: false,
        reveal_points: false,
        agreed_points: undefined,
        last_restart_time: new Date().toISOString()
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
