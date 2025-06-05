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

    const updatedSession = {
        ...sessionRecord,
        reveal_points: true
    }

    const { data, updateError } = await supabase
        .from('session')
        .update(updatedSession)
        .eq('name', name)
        .select()
        .single()

    if (updateError) {
        console.error('Error updating session:')
        return null
    }
    return data
}
