import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../store'

// declaring the types for our state
export type CounterState = {
  value: number
  isLoading: boolean
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
}

// async thunks
const url = 'http://localhost:3000/api/counter'
export const getCounterData = createAsyncThunk('counter/getCounterData', () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err))
})

// Redux Toolkit allows us to write "mutating" logic in reducers.
// It doesn't actually mutate the state because it uses the Immer library, which detects changes to a "draft state"
// and produces a brand new immutable state based off those changes

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value++
    },
    decrement: (state) => {
      state.value--
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCounterData.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCounterData.fulfilled, (state, action: PayloadAction<{ value: number }>) => {
        state.value = action.payload.value
        state.isLoading = false
      })
      .addCase(getCounterData.rejected, (state) => {
        state.isLoading = false
      })
  },
})

// actions
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// selectors
export const selectCount = (state: AppState) => state.counter.value

export default counterSlice.reducer
