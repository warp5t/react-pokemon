import { configureStore } from '@reduxjs/toolkit';
import pokeListReducer from '../data/pokeSlice/pokeSlice'; // Default импорт

export const store = configureStore({
  reducer: {
    pokeList: pokeListReducer, // Используем редьюсер
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch