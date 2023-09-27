import { applyMiddleware, combineReducers, createStore } from 'redux';
import commentsReducer from './commentsReducer';
import favoriteReducer from './favoritesReducer';
import postReducer from './postReducer';
import postsReducer from './postsReducer';
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import { localStorageMiddleware } from './localStorageMiddleware.js';

const reducers = combineReducers({
  posts: postsReducer,
  post: postReducer,
  users: usersReducer,
  user: userReducer,
  comments: commentsReducer,
  favorites: favoriteReducer,
});

const store = createStore(
  reducers,
  applyMiddleware(localStorageMiddleware),
);

export default store;
