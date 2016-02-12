const changeView = (newView) =>{
  switch (newView) {
    case 'FORM:LOGIN':
      return {type: 'SWITCH_TO_LOGIN'}
    case 'FORM:REGISTER':
      return {type: 'SWITCH_TO_REGISTER'}
    default:
      return {type: 'SWITCH_TO_LOGIN'}
  }
}

const generatePassword = () =>{
  return {type: 'GENERATE_PSW'} 
}

const addUser = (userData) => {
  return {
    type: 'ADD_USER',
    name: userData.name,
    email: userData.email,
    phone: userData.phone.replace(/[^\d]/g, ''),
    city: userData.city,
    country: userData.country,
    mobileOS: userData.mobileOS
  }
}
module.exports = {changeView, generatePassword, addUser}