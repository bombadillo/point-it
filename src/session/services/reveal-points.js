export default async (sessionName) => {
    const revealPointsResponse = await fetch(
        '/.netlify/functions/reveal-points',
        {
            method: 'PUT',
            body: JSON.stringify({ name: sessionName })
        }
    )

    if (revealPointsResponse.ok) {
        const session = await revealPointsResponse.json()
        return session
    }

    return null
}
