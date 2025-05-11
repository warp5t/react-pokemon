import { configureStore } from '@reduxjs/toolkit';
import pokeListReducer from '../slicers/pokeSlice/pokeSlice';
import pokeDetailsReducer from '../slicers/pokeDetails/detailsSlice';

const rootReducer = {
  pokeList: pokeListReducer,
  pokeDetails: pokeDetailsReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
