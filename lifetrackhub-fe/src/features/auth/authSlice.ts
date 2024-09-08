import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: undefined,
  accessToken: undefined,
  email: undefined,
  role: undefined,
  userId: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { name, accessToken, email, role, userId } = action.payload;
      state.name = name;
      state.accessToken = accessToken;
      state.email = email;
      state.role = role;
      state.userId = userId;
    },
    userLoggedOut: state => {
      state.name = undefined;
      state.accessToken = undefined;
      state.email = undefined;
      state.role = undefined;
      state.userId = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
