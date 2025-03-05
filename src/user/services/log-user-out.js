export default () => {
  localStorage.clear()
  console.log( JSON.parse(localStorage.getItem('session')))
}
