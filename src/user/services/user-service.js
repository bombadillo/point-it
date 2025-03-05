const userService = {
  getLoggedInUser () {
    const userString = localStorage.getItem('user')

  return JSON.parse(userString)
  },
  logUserOut() {
    localStorage.clear()
  }
}



export default userService;