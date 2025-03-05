export default async () => {
  const response = await fetch('/.netlify/functions/jira-grooming-tickets')

  if (response.ok) {
    return await response.json()
  }

  return null
}
