export const initialState = {
  isLoggedIn: false,
  userData: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default reducer;

// export const initialState =false;

// const reducer  = (state, action)=>{
//     if(action.type ==="USER"){
//         return action.payload;
//     }
//     return state;
// }
// export default reducer;
