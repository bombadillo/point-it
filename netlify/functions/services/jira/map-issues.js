module.exports = payload => {
  const mappedIssues = payload.issues.map(issue => {
    return {
      id: issue.id,
      name: issue.key,
      summary: issue.fields.summary,
      reportedBy: issue.fields.reporter.displayName,
      type: issue.fields.issuetype.name,
      description: buildDescription(issue.fields.description)
    }
  })

  return mappedIssues
}

function buildDescription(descriptionFields) {
  if (!descriptionFields) {
    return ''
  }

  const str = descriptionFields.content.reduce((acc, curr) => {
    return `${acc} ${getContentFromDescriptionItem(curr.content)}`
  }, '')

  return str
}

function getContentFromDescriptionItem(content, contentStringPassedIn) {
  let contentString = contentStringPassedIn || ''

  if (content?.length === 0) {
    return contentString
  }

  content.forEach(contentItem => {
    if (content?.length === 0) {
      return ''
    }

    contentString += getNestedContentFromDescriptionItem(
      contentItem,
      contentString
    )
  })

  return contentString
}

function getNestedContentFromDescriptionItem(content, contentStringPassedIn) {
  if (content?.content) {
    return getNestedContentFromDescriptionItem(content?.content)
  }

  if (content?.text) {
    return `${content.text} - `
  }

  if (content?.length > 0) {
    return getContentFromDescriptionItem(content, contentStringPassedIn)
  }

  return ''
}
