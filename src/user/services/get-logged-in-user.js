export default () => {
  const userString = localStorage.getItem('user')

  return JSON.parse(userString)
}
