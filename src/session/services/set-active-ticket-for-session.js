export default async (sessionName, ticket) => {
  const setActiveTicketResponse = await fetch(
    '/.netlify/functions/set-active-ticket-for-session',
    {
      method: 'PUT',
      body: JSON.stringify({ name: sessionName, ticketId: ticket.id })
    }
  )

  if (setActiveTicketResponse.ok) {
    const session = await setActiveTicketResponse.json()
    localStorage.setItem('session', JSON.stringify(session))
    return session
  }

  return null
}
