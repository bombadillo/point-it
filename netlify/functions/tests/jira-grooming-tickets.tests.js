const examplePayload = require('./example-jira-grooming-tickets-payload.json')
const mapIssues = require('../services/jira/map-issues')

const mappedIssues = mapIssues(examplePayload)

if (mappedIssues) {
  console.log(true)
}
