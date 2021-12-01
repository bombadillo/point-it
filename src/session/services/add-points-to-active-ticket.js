export default async (sessionName, user, points) => {
  const setActiveTicketResponse = await fetch(
    '/.netlify/functions/add-points-to-active-ticket',
    {
      method: 'PUT',
      body: JSON.stringify({ name: sessionName, user, points })
    }
  )

  if (setActiveTicketResponse.ok) {
    const session = await setActiveTicketResponse.json()
    localStorage.setItem('session', JSON.stringify(session))
    return session
  }

  return null
}
