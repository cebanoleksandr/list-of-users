const GET_USER = 'GET_USER';

const userState = {
  currentUser: null,
};

const userReducer = (state = userState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        currentUser: action.payload,
      }
      
    default:
      return state;
  }
};

//action creators
export const getUserAC = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

export default userReducer;
