const GET_POSTS = 'GET_POSTS';

const postsState = {
  items: [],
};

const postsReducer = (state = postsState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        items: action.payload,
      }
      
    default:
      return state;
  }
};

//action creators
export const getPostsAC = (posts) => {
  return {
    type: GET_POSTS,
    payload: posts,
  };
};

export default postsReducer;
