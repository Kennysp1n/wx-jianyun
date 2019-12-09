const getDate = () => {
  let year = new Date().getFullYear()
  let month = new Date().getMonth()
  let day = new Date().getDate()
  let time = new Date().toTimeString().split(' ')[0]
  return year + '/' + month + '/' + day + '/ ' + time
}
module.exports = {
  getDate
}