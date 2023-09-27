const GET_POST = 'GET_POST';

const postState = {
  currentPost: null,
};

const postReducer = (state = postState, action) => {
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        currentPost: action.payload,
      }
      
    default:
      return state;
  }
};

//action creators
export const getPostAC = (post) => {
  return {
    type: GET_POST,
    payload: post,
  };
};

export default postReducer;

