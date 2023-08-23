import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserPayload = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

type UserState = {
  user: UserPayload | null;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserPayload>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
