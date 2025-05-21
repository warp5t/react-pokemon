import { configureStore, combineReducers } from '@reduxjs/toolkit';
import pokeListReducer from '../slicers/pokeList/pokeSlice';
import pokeDetailsReducer from '../slicers/pokeDetails/detailsSlice';
import favoritesReducer from '../slicers/pokeFavorite/pokeFavorite';
import compareReducer from '../slicers/pokeCompare/compareSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { firstPage } from '../firstPageApi/firstPageApi';
// import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['pokeCompare'],
  blacklist: ['pokeList','pokeDetails','pokeFavorites'],
  // stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  pokeList: pokeListReducer,
  pokeDetails: pokeDetailsReducer,
  pokeFavorites: favoritesReducer,
  pokeCompare: compareReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
   persistedReducer,
   [firstPage.reducerPath]: firstPage.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(firstPage.middleware),
});

export const selectPokeList = (state: RootState) => state.persistedReducer.pokeList;
export const selectPokeFavorites = (state: RootState) => state.persistedReducer.pokeFavorites;
export const selectPokeCompare = (state: RootState) => state.persistedReducer.pokeCompare;

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
