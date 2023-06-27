import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../store';

// declaring the types for our state
export type ThemeModes = 'light' | 'dark'

export type ThemeState = {
  mode: ThemeModes
}

const initialState: ThemeState = {
  mode: 'light'
}

// Redux Toolkit allows us to write "mutating" logic in reducers.
// It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state"
// and produces a brand new immutable state based off those changes

// reducers
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchTheme: state => {
      const newMode = state.mode === 'light' ? 'dark' : 'light'
      state.mode = newMode
      window.localStorage.setItem('themeMode', newMode)
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload
      window.localStorage.setItem('themeMode', action.payload)
    },
  },
})

// actions
export const { switchTheme, setTheme } = themeSlice.actions

// selectors
export const selectTheme = (state: AppState) => state.theme.mode

export default themeSlice.reducer
