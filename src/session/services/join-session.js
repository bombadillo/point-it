export default async (sessionName, user) => {
    const createResponse = await fetch('/.netlify/functions/join-session', {
        method: 'PUT',
        body: JSON.stringify({ name: sessionName, user })
    })

    if (createResponse.ok) {
        const session = await createResponse.json()
        return session
    }

    return null
}
