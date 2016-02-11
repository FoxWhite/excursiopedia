const getUserList = () => {
  return JSON.parse(window.localStorage.getItem('redux')).users;
}

const getUserEmails = () => {
  return _.map(getUserList(), 'email');
}

module.exports = {getUserList, getUserEmails};