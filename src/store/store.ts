import { configureStore } from '@reduxjs/toolkit';
import pokeListReducer from '../slicers/pokeLIst/pokeSlice';
import pokeDetailsReducer from '../slicers/pokeDetails/detailsSlice';
import favoritesReducer from '../slicers/pokeFavorite/pokeFavorite'

const rootReducer = {
  pokeList: pokeListReducer,
  pokeDetails: pokeDetailsReducer,
  pokeFavorites: favoritesReducer
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
