export default async (sessionName, user) => {
    const createResponse = await fetch('/.netlify/functions/create-session', {
        method: 'POST',
        body: JSON.stringify({ name: sessionName, user })
    })

    if (createResponse.ok) {
        const session = await createResponse.json()
        return session
    }

    return null
}
