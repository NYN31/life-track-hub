import { createSlice } from '@reduxjs/toolkit';
import { IUserDetails } from '../../types/user';

const userDetails: IUserDetails = {
  objective: undefined,
  profileImage: undefined,
  cv: undefined,
  skills: [],
  educations: [],
  experiences: [],
  achivemenets: [],
  socialLinks: [],
};

const initialState = {
  userObject: {
    id: undefined,
    createdDate: undefined,
    lastModifiedDate: undefined,
    firstname: undefined,
    lastname: undefined,
    email: undefined,
    enabled: undefined,
    role: undefined,
    userDetails: userDetails,
  },
  userErrorMessage: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserObject: (state, action) => {
      state.userObject = action.payload;
    },

    resetUserObject: state => {
      state.userObject = {
        id: undefined,
        createdDate: undefined,
        lastModifiedDate: undefined,
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        enabled: undefined,
        role: undefined,
        userDetails: userDetails,
      };
      state.userErrorMessage = undefined;
    },
  },
});

export const { updateUserObject, resetUserObject } = userSlice.actions;
export default userSlice.reducer;
