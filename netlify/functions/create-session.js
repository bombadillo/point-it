const { createClient } = require('@supabase/supabase-js')
const mapSessionToResponse = require('./services/session/map-session-to-response')

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

exports.handler = async function (event) {
    try {
        const eventBody = JSON.parse(event.body)

        if (!eventBody.user) {
            return {
                statusCode: 400
            }
        }

        const newSessionName = await generateSessionName()
        const session = await addSession(newSessionName, eventBody.user)

        if (session) {
            return {
                statusCode: 200,
                body: JSON.stringify(mapSessionToResponse(session))
            }
        }

        return {
            statusCode: 409
        }
    } catch (e) {
        console.log(e)

        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    }
}

async function addSession(sessionName, user) {
    if (await sessionExists(sessionName)) {
        return null
    }

    const { data, error } = await supabase
        .from('session')
        .insert([{ name: sessionName, users: [user] }])
        .select()
        .single()

    if (error) {
        console.error('Error creating session:', error)
        return null
    }

    return data
}

async function sessionExists(sessionName) {
    const { data, error } = await supabase
        .from('session')
        .select()
        .eq('name', sessionName)
        .limit(1)

    if (error) return true // Fail safe
    return data.length > 0
}

async function generateSessionName() {
    var adjs = [
            'autumn',
            'hidden',
            'bitter',
            'misty',
            'silent',
            'empty',
            'dry',
            'dark',
            'summer',
            'icy',
            'delicate',
            'quiet',
            'white',
            'cool',
            'spring',
            'winter',
            'patient',
            'twilight',
            'dawn',
            'crimson',
            'wispy',
            'weathered',
            'blue',
            'billowing',
            'broken',
            'cold',
            'damp',
            'falling',
            'frosty',
            'green',
            'long',
            'late',
            'lingering',
            'bold',
            'little',
            'morning',
            'muddy',
            'old',
            'red',
            'rough',
            'still',
            'small',
            'sparkling',
            'throbbing',
            'shy',
            'wandering',
            'withered',
            'wild',
            'black',
            'young',
            'holy',
            'solitary',
            'fragrant',
            'aged',
            'snowy',
            'proud',
            'floral',
            'restless',
            'divine',
            'polished',
            'ancient',
            'purple',
            'lively',
            'nameless'
        ],
        nouns = [
            'waterfall',
            'river',
            'breeze',
            'moon',
            'rain',
            'wind',
            'sea',
            'morning',
            'snow',
            'lake',
            'sunset',
            'pine',
            'shadow',
            'leaf',
            'dawn',
            'glitter',
            'forest',
            'hill',
            'cloud',
            'meadow',
            'sun',
            'glade',
            'bird',
            'brook',
            'butterfly',
            'bush',
            'dew',
            'dust',
            'field',
            'fire',
            'flower',
            'firefly',
            'feather',
            'grass',
            'haze',
            'mountain',
            'night',
            'pond',
            'darkness',
            'snowflake',
            'silence',
            'sound',
            'sky',
            'shape',
            'surf',
            'thunder',
            'violet',
            'water',
            'wildflower',
            'wave',
            'water',
            'resonance',
            'sun',
            'wood',
            'dream',
            'cherry',
            'tree',
            'fog',
            'frost',
            'voice',
            'paper',
            'frog',
            'smoke',
            'star'
        ]

    const newSessionName =
        adjs[Math.floor(Math.random() * (adjs.length - 1))] +
        '-' +
        nouns[Math.floor(Math.random() * (nouns.length - 1))] +
        '-' +
        nouns[Math.floor(Math.random() * (nouns.length - 1))]

    if (await sessionExists(newSessionName)) return await generateSessionName()

    return newSessionName
}
