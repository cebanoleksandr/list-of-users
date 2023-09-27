const GET_COMMENTS = 'GET_COMMENTS';
const REMOVE_COMMENTS = 'REMOVE_COMMENTS';
const CREATE_COMMENTS = 'CREATE_COMMENTS';

const commentsState = {
  items: [],
};

const commentsReducer = (state = commentsState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        items: action.payload,
      }

    case REMOVE_COMMENTS:
      return {
        ...state,
        items: state.comments.filter(comment => comment.id !== action.payload),
      }

    case CREATE_COMMENTS:
      return {
        ...state,
        items: [...state.comments, action.payload],
      }
      
    default:
      return state;
  }
};

//action creators
export const getCommentsAC = (comments) => {
  return {
    type: GET_COMMENTS,
    payload: comments,
  };
};

export const removeCommentsAC = (commentId) => {
  return {
    type: GET_COMMENTS,
    payload: commentId,
  };
};

export const createCommentsAC = (comment) => {
  return {
    type: GET_COMMENTS,
    payload: comment,
  };
};

export default commentsReducer;
