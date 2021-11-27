export default async () => {
  const response = await fetch(
    'http://localhost:63349/.netlify/functions/jira-grooming-tickets'
  )

  if (response.ok) {
    return await response.json()
  }

  return null
}
