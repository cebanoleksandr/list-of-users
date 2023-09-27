export const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  if (
    action.type === 'ADD_TO_FAVORITES' ||
    action.type === 'REMOVE_ALL_FAVORITES' ||
    action.type === 'REMOVE_FROM_FAVORITES'
  ) {
    localStorage.setItem(
      'favorites',
      JSON.stringify(state.favorites.favoriteGoods),
    );
  }

  return result;
};
