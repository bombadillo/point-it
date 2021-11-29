export default async sessionName => {
  const createResponse = await fetch('/.netlify/functions/create-session', {
    method: 'POST',
    body: JSON.stringify({ name: sessionName })
  })

  if (createResponse.ok) {
    return await createResponse.json()
  }

  return null
}
