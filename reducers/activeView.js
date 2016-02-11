const initialState = "FORM:LOGIN"

export default function activeView(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH_TO_LOGIN':
      return "FORM:LOGIN"

    case 'SWITCH_TO_REGISTER':
      return "FORM:REGISTER"
      
    default: 
      return state;
  }
}
