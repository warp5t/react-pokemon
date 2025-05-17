import { configureStore } from '@reduxjs/toolkit';
import pokeListReducer from '../slicers/pokeList/pokeSlice';
import pokeDetailsReducer from '../slicers/pokeDetails/detailsSlice';
import favoritesReducer from '../slicers/pokeFavorite/pokeFavorite';
import compareReducer from '../slicers/pokeCompare/compareSlice';

const rootReducer = {
  pokeList: pokeListReducer,
  pokeDetails: pokeDetailsReducer,
  pokeFavorites: favoritesReducer,
  pokeCompare: compareReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
