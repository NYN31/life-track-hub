import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: undefined,
  visibility: undefined,
  tags: [],
  content: undefined,
  slug: undefined,
  coverImagePath: undefined,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    blogContentDraft: (state, action) => {
      const { title, visibility, tags, content, coverImagePath } =
        action.payload;
      state.title = title;
      state.visibility = visibility;
      state.tags = tags;
      state.content = content;
      state.coverImagePath = coverImagePath;
    },
    blogReset: state => {
      state.title = undefined;
      state.visibility = undefined;
      state.tags = [];
      state.content = undefined;
      state.slug = undefined;
      state.coverImagePath = undefined;
    },
  },
});

export const { blogContentDraft, blogReset } = blogSlice.actions;
export default blogSlice.reducer;
