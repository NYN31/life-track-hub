import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: undefined,
  visibility: undefined,
  tags: [],
  content: undefined,
  slug: undefined,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    blogContentDraft: (state, action) => {
      const { title, visibility, tags, content } = action.payload;
      state.title = title;
      state.visibility = visibility;
      state.tags = tags;
      state.content = content;
    },
    blogReset: state => {
      state.title = undefined;
      state.visibility = undefined;
      state.tags = [];
      state.content = undefined;
      state.slug = undefined;
    },
  },
});

export const { blogContentDraft } = blogSlice.actions;
export default blogSlice.reducer;
