const fetch = require('node-fetch')

exports.handler = async function () {
  const url = 'https://arnoldclark.atlassian.net/rest/api/3/search'
  const username = process.env.JIRA_USERNAME
  const password = process.env.JIRA_PASSWORD
  const body = {
    jql: 'project = OneX and labels = Grooming'
  }
  const jiraResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' +
        Buffer.from(`${username}:${password}`, 'binary').toString('base64')
    },
    body: JSON.stringify(body)
  })

  const tickets = await jiraResponse.json()

  return {
    statusCode: 200,
    body: JSON.stringify({ tickets })
  }
}
