export default async (sessionName, user) => {
  const createResponse = await fetch('/.netlify/functions/join-session', {
    method: 'PUT',
    body: JSON.stringify({ name: sessionName, user })
  })

  if (createResponse.ok) {
    const session = await createResponse.json()
    localStorage.setItem('session', JSON.stringify(session))
    return session
  }

  return null
}
