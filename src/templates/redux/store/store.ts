import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

// further info: https://redux-toolkit.js.org/usage/nextjs

const combinedReducer = combineReducers({
  counter: counterReducer,
})

export const makeStore = () =>
  configureStore({
    reducer: combinedReducer,
  })

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>
