import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogCommentResponseDto } from '../../types/blog';

export interface BlogCommentState {
  content: BlogCommentResponseDto[];
  hasNext: boolean;
  hasPrevious: boolean;
  pageNumber: number;
  totalPages: number;
  totalComments: number;
  currentPage: number;
}

const initialState: BlogCommentState = {
  content: [],
  hasNext: false,
  hasPrevious: false,
  pageNumber: 0,
  totalPages: 0,
  totalComments: 0,
  currentPage: 0,
};

const MAX_PAGE_SIZE = 10;

const blogCommentSlice = createSlice({
  name: 'blogComment',
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      state.pageNumber = action.payload;
    },

    setTotalComments: (state, action) => {
      state.totalComments = action.payload;
    },

    setBlogComment: (state, action: PayloadAction<BlogCommentState>) => {
      const { content, hasNext, hasPrevious, pageNumber, totalPages } =
        action.payload;

      state.content = content;
      state.hasNext = hasNext;
      state.hasPrevious = hasPrevious;
      state.pageNumber = pageNumber;
      state.totalPages = totalPages;
    },

    addBlogCommentOptimistically: (
      state,
      action: PayloadAction<BlogCommentResponseDto>
    ) => {
      state.content.unshift(action.payload);
      state.totalComments += 1;

      // keep only MAX_PAGE_SIZE per page
      if (state.content.length > MAX_PAGE_SIZE) {
        state.content.pop();
      }

      // If we’re on first page → update pagination counters
      if (state.pageNumber === 0) {
        const totalComments = state.totalComments + 1;
        const newTotalPages = Math.ceil(totalComments / MAX_PAGE_SIZE);

        if (newTotalPages > state.totalPages) {
          state.totalPages = newTotalPages;
        }

        state.hasPrevious = state.pageNumber > 0;
        state.hasNext = state.pageNumber < state.totalPages - 1;
      }
    },

    updateOptimisticBlogComment: (
      state,
      action: PayloadAction<{
        optimisticId: number;
        realComment: BlogCommentResponseDto;
      }>
    ) => {
      const { optimisticId, realComment } = action.payload;
      const index = state.content.findIndex(
        comment => comment.commentId === optimisticId
      );

      if (index !== -1) {
        // replace the optimistic comment with real one from server
        state.content[index] = realComment;
      }
    },

    updateBlogComment: (state, action) => {
      const index = state.content.findIndex(
        comment => comment.commentId === action.payload.commentId
      );

      if (index !== -1) {
        state.content[index] = action.payload;
      }
    },

    rollbackBlogComment: (state, action: PayloadAction<number>) => {
      state.content = state.content.filter(c => c.commentId !== action.payload);
      state.totalComments -= 1;

      // If rollback happend on first page -> recalc pagination
      if (state.pageNumber === 0) {
        const totalComments = state.totalComments - 1;
        state.totalPages = Math.max(
          1,
          Math.ceil(totalComments / MAX_PAGE_SIZE)
        );
        state.hasPrevious = state.pageNumber > 0;
        state.hasNext = state.pageNumber < state.totalPages - 1;
      }
    },
  },
});

export const {
  updateCurrentPage,
  setTotalComments,
  setBlogComment,
  addBlogCommentOptimistically,
  rollbackBlogComment,
  updateOptimisticBlogComment,
  updateBlogComment,
} = blogCommentSlice.actions;
export default blogCommentSlice.reducer;
