const initialState = null;

export default function currPassword(state = initialState, action) {
  switch (action.type) {
    case 'GENERATE_PSW':
      return (Math.floor(Math.random()*90000) + 10000).toString(); // 5 digit random
    default: 
      return state;
  }
}
