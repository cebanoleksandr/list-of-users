const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
const REMOVE_ALL_FAVORITES = 'REMOVE_ALL_FAVORITES';

const getFavorites = ()=> {
  const savedFavoritesData = localStorage.getItem('favorites');

  return savedFavoritesData ? JSON.parse(savedFavoritesData) : [];
};

const favoriteState = {
  favoriteGoods: getFavorites(),
};

const favoriteReducer = (state = favoriteState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favoriteGoods: [...state.favoriteGoods, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteGoods: state.favoriteGoods.filter(
          (post) => post.id !== action.postId,
        ),
      };

    case REMOVE_ALL_FAVORITES:
      return {
        ...state,
        favoriteGoods: [],
      };

    default:
      return state;
  }
};

//action creators
export const addToFavorites = (post) => {
  return {
    type: ADD_TO_FAVORITES,
    payload: post,
  };
};

export const removeFromFavorites = (postId) => {
  return {
    type: REMOVE_FROM_FAVORITES,
    postId,
  };
};

export const removeAllFavorites = () => {
  return {
    type: REMOVE_ALL_FAVORITES,
  };
};

export default favoriteReducer;
