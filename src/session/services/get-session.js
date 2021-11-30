export default async sessionName => {
  const getResponse = await fetch(
    `/.netlify/functions/get-session?name=${sessionName}`
  )

  if (getResponse.ok) {
    const session = await getResponse.json()
    localStorage.setItem('session', JSON.stringify(session))
    return session
  }

  localStorage.removeItem('session')

  return null
}
