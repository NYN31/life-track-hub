import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalLikes: 0,
};

const blogLikeSlice = createSlice({
  name: 'blogLikeSlice',
  initialState,
  reducers: {
    setLikesCount: (state, action) => {
      state.totalLikes = action.payload;
    },
  },
});

export const { setLikesCount } = blogLikeSlice.actions;
export default blogLikeSlice.reducer;
