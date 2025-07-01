import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: undefined,
  accessToken: undefined,
  email: undefined,
  role: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { name, accessToken, email, role } = action.payload;
      state.name = name;
      state.accessToken = accessToken;
      state.email = email;
      state.role = role;
    },
    userLoggedOut: state => {
      state.name = undefined;
      state.accessToken = undefined;
      state.email = undefined;
      state.role = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
