const GET_USERS = 'GET_USERS';

const usersState = {
  items: [],
};

const usersReducer = (state = usersState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        items: action.payload,
      }
      
    default:
      return state;
  }
};

//action creators
export const getUsersAC = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

export default usersReducer;
