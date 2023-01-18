import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authenticationReducer from './slices/authenticationSlice';
import  pokemonReducer  from './slices/pokemonSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    authentication: authenticationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
