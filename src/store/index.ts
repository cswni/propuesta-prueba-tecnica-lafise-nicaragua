import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from '@/store/services/api'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, accounts: [] },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setUserAccounts: (state, action) => {
      state.accounts = action.payload;
    },
  },
})

export const { setUser, setUserAccounts } = userSlice.actions

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
