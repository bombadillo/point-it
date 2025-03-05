export default async (sessionName) => {
    const groomNextTicketResponse = await fetch(
        '/.netlify/functions/groom-next-ticket',
        {
            method: 'PUT',
            body: JSON.stringify({ name: sessionName })
        }
    )

    if (groomNextTicketResponse.ok) {
        const session = await groomNextTicketResponse.json()
        return session
    }

    return null
}
