const fetch = require('node-fetch')
const mapIssues = require('./services/jira/map-issues')

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

  if (jiraResponse.ok) {
    const jiraResponsePayload = await jiraResponse.json()

    const issues = mapIssues(jiraResponsePayload)
  
    return {
      statusCode: 200,
      body: JSON.stringify({ issues }),
      headers: {
        'Access-Control-Allow-Origin': '*' // Allow from anywhere
      }
    }
  }

  return {
    statusCode: jiraResponse.status,
    headers: {
      'Access-Control-Allow-Origin': '*' // Allow from anywhere
    }
  }

}
