const fetch = require('node-fetch')

module.exports = async (ticketId, points) => {
  const url = `https://arnoldclark.atlassian.net/rest/api/2/issue/${ticketId}`

  const username = process.env.JIRA_USERNAME
  const password = process.env.JIRA_PASSWORD
  const body = {
    fields: {
      customfield_10117: points
    },
    update: {
      labels: [{ remove: 'Grooming' }]
    }
  }

  const jiraResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' +
        Buffer.from(`${username}:${password}`, 'binary').toString('base64')
    },
    body: JSON.stringify(body)
  })

  if (jiraResponse.ok) {
    console.log('update successful')
    return true
  }

  console.log('failed to update', jiraResponse.status)
  console.log(JSON.stringify(jiraResponse))
  return false
}
