export default async (sessionName, user, points, activeTicketId) => {
  const setActiveTicketResponse = await fetch(
    '/.netlify/functions/add-points-to-active-ticket',
    {
      method: 'PUT',
      body: JSON.stringify({ name: sessionName, user, points, activeTicketId })
    }
  )

  if (setActiveTicketResponse.ok) {
    const session = await setActiveTicketResponse.json()
    localStorage.setItem('session', JSON.stringify(session))
    return session
  }

  return null
}
