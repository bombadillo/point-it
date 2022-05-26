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

  const descriptions = descriptionFields.content.map(descriptionField => {
    return getContentFromDescriptionItem(descriptionField.content)
  })

  return descriptions.flat(1)
}

function getContentFromDescriptionItem(content) {
  if (!content || content?.length === 0) {
    return null
  }

  const descriptions = []

  content.forEach(contentItem => {
    if (content?.length === 0) {
      return null
    }

    descriptions.push(getNestedContentFromDescriptionItem(contentItem))
  })

  return descriptions
}

function getNestedContentFromDescriptionItem(content) {
  if (content?.content) {
    return getNestedContentFromDescriptionItem(content?.content)
  }

  if (content?.text) {
    return content.text
  }

  if (content?.attrs) {
    return content.attrs.url
  }

  if (content?.length > 0) {
    return getContentFromDescriptionItem(content)
  }

  return ''
}
