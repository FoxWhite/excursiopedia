import uuid from 'node-uuid';
const initialState = [
  // {
    // name: "",
    // email: "",
    // tel: "",
    // city: "",
    // country: "",
    // mobileOS: ""
  // }
]

export default function users(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [
        {
          id: uuid.v4(),
          isLoggedIn: false,
          name: action.name,
          email: action.email,
          phone: action.phone,
          city: action.city,
          country: action.country,
          mobileOS: action.mobileOS
        },
        ...state
      ]
    default: 
      return state;
  }
}
