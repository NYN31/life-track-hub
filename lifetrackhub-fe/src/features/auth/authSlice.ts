import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: undefined,
  name: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  roles: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      const { username, name, accessToken, refreshToken, roles } =
        action.payload;
      state.username = username;
      state.name = name;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.roles = roles;
    },
    userLoggedOut: state => {
      state.username = undefined;
      state.name = undefined;
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.roles = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
