import { configureStore } from '@reduxjs/toolkit';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from '@/store/services/api';
import type { AccountUI } from '@/types/accounts';
import type { User } from '@/types/user';

interface UserState {
  data: User | null;
  accounts: AccountUI[];
}

const initialState: UserState = {
  data: null,
  accounts: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    setUserAccounts: (state, action: PayloadAction<AccountUI[]>) => {
      state.accounts = action.payload;
    },
  },
});

export const { setUser, setUserAccounts } = userSlice.actions;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
