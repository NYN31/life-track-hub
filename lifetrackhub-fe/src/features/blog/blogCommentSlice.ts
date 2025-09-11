import { createSlice } from '@reduxjs/toolkit';
import { BlogCommentResponseDto } from '../../types/blog';

export interface BlogCommentState {
  content: BlogCommentResponseDto[];
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  totalPages: number;
}

const initialState: BlogCommentState = {
  content: [],
  hasNext: false,
  hasPrevious: false,
  pageNumber: 0,
  totalPages: 0,
};

const blogCommentSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    addBlogComment: (state, action) => {
      const { content, hasNext, hasPrevious, pageNumber, totalPages } =
        action.payload;

      state.content = content;
      state.hasNext = hasNext;
      state.hasPrevious = hasPrevious;
      state.pageNumber = pageNumber;
      state.totalPages = totalPages;
    },
  },
});

export const { addBlogComment } = blogCommentSlice.actions;
export default blogCommentSlice.reducer;
