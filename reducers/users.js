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
          name: action.name,
          email: action.email,
          tel: action.tel,
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
