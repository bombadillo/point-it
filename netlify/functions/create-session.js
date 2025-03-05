const faunadb = require('faunadb'),
  q = faunadb.query

let client

exports.handler = async function (event) {
  try {
    client = new faunadb.Client({
      secret: process.env.FAUNADB_SECRET,
      domain: 'db.eu.fauna.com',
      keepAlive: false
    })

    const eventBody = JSON.parse(event.body)

    if (!eventBody.user) {
      return {
        statusCode: 400
      }
    }

    const newSessionName = await generateSessionName();
    const session = await addSession(newSessionName, eventBody.user)

    if (session) {
      return {
        statusCode: 200,
        body: JSON.stringify(session.data)
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

  return await client.query(
    q.Create(q.Collection('session'), {
      data: { name: sessionName, users: [user] }
    })
  )
}

async function sessionExists(sessionName) {
  const sessionResults = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('session_name'), sessionName), { size: 1 }),
      q.Lambda(x => q.Get(x))
    )
  )

  return sessionResults.data.length > 0
}

async function generateSessionName() {
    var adjs = ["autumn", "hidden", "bitter", "misty", "silent", "empty", "dry",
    "dark", "summer", "icy", "delicate", "quiet", "white", "cool", "spring",
    "winter", "patient", "twilight", "dawn", "crimson", "wispy", "weathered",
    "blue", "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
    "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
    "red", "rough", "still", "small", "sparkling", "throbbing", "shy",
    "wandering", "withered", "wild", "black", "young", "holy", "solitary",
    "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
    "polished", "ancient", "purple", "lively", "nameless"]
  
    , nouns = ["waterfall", "river", "breeze", "moon", "rain", "wind", "sea",
    "morning", "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn",
    "glitter", "forest", "hill", "cloud", "meadow", "sun", "glade", "bird",
    "brook", "butterfly", "bush", "dew", "dust", "field", "fire", "flower",
    "firefly", "feather", "grass", "haze", "mountain", "night", "pond",
    "darkness", "snowflake", "silence", "sound", "sky", "shape", "surf",
    "thunder", "violet", "water", "wildflower", "wave", "water", "resonance",
    "sun", "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
    "frog", "smoke", "star"];
  
    const newSessionName = adjs[Math.floor(Math.random()*(adjs.length-1))]+"-"+nouns[Math.floor(Math.random()*(nouns.length-1))]+"-"+nouns[Math.floor(Math.random()*(nouns.length-1))];

    if (await sessionExists(newSessionName))
      return await generateSessionName();

    return newSessionName;

  }
