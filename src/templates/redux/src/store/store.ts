import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

const combinedReducer = combineReducers({
  counter: counterReducer,
})

const makeStore = () => configureStore({
  reducer: combinedReducer,
})

export const store = makeStore()

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
