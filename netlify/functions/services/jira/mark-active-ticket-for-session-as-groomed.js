module.exports = async (sessionRecord) => {
  console.log(JSON.stringify(sessionRecord))
  const updatedSession = {
    name: sessionRecord.data.name,
    users: sessionRecord.data.users,
    groomingSuccessful: true
  }

  updatedSession.users.forEach((item) => {
    delete item.points
  })

  console.log(JSON.stringify(updatedSession))

  return updatedSession;
}
