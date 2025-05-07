import { configureStore } from '@reduxjs/toolkit';
import pokeListReducer from '../data/pokeSlice/pokeSlice'; // Default импорт

const rootReducer = {
  pokeList: pokeListReducer,
}

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

