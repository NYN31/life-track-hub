import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, IUserDetails } from '../../types/user';

interface UserState {
  user: IUser | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setUserDetails(state, action: PayloadAction<IUserDetails>) {
      if (state.user) {
        state.user.userDetails = action.payload;
      }
    },
  },
});

export const { setUser, setUserDetails } = userSlice.actions;
export default userSlice.reducer;
