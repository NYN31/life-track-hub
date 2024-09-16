import { createSlice } from '@reduxjs/toolkit';
import { IUserDetails } from '../../types/user';

const userDetails: IUserDetails = {
  objective: '',
  profileImage: null,
  cv: null,
  skills: [],
  educations: [],
  experiences: [],
  achivemenets: [],
  socialLinks: [],
};

const initialState = {
  userObject: {
    id: 0,
    createdDate: '',
    lastModifiedDate: '',
    firstname: '',
    lastname: '',
    email: '',
    enabled: true,
    role: '',
    userDetails: userDetails,
  },
  userErrorMessage: '',
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
        id: 0,
        createdDate: '',
        lastModifiedDate: '',
        firstname: '',
        lastname: '',
        email: '',
        enabled: true,
        role: '',
        userDetails: userDetails,
      };
      state.userErrorMessage = '';
    },
  },
});

export const { updateUserObject, resetUserObject } = userSlice.actions;
export default userSlice.reducer;
