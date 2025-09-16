import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import {
  BlogCommentState,
  updateBlogComment,
  updateCurrentPage,
} from '../../features/blog/blogCommentSlice';
import {
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from '../../features/blog/blogCommentApi';
import { useParams } from 'react-router-dom';
import { useToast } from '../../context/toast-context';
import SimplePagination from '../common/SimplePagination';
import useAuth from '../../helper/hooks/useAuth';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';

const BlogComments = () => {
  const MIN_COMMENT_FOR_SHOW_TOP_PAGINATION = 5;
  const { slug } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const isAuth = useAuth();

  const blogCommentState = useSelector((state: RootState) => state.blogComment);
  const {
    content,
    hasNext,
    hasPrevious,
    pageNumber,
    totalPages,
    totalComments,
  } = blogCommentState as BlogCommentState;

  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');

  const [addComment, { isLoading: isAddCommentLoading }] =
    useAddCommentMutation();
  const [updateComment, { isLoading: isUpdateCommentLoading }] =
    useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const addCommentHandler = async () => {
    await addComment({ slug, content: commentContent })
      .unwrap()
      .then(() => {
        setCommentContent('');
        toast('Comment add successfully', 'success', 3000);
      })
      .catch(err => {
        toast(err.data.message, 'error', 300);
      });
  };

  const updateCommentHandler = async () => {
    await updateComment({
      commentId: editCommentId,
      content: editCommentContent,
      slug,
      currentPage: pageNumber,
    })
      .unwrap()
      .then(res => {
        dispatch(updateBlogComment(res));
        setEditCommentContent(res.content);
        setEditCommentId(null);
        toast('Comment update successfully', 'success', 3000);
      })
      .catch(err => {
        toast(err.data.message, 'error', 300);
      });
  };

  const deleteCommentHandler = async (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteComment({ commentId, slug, currentPage: pageNumber })
        .unwrap()
        .then(res => {
          dispatch(updateBlogComment(res));
          toast('Comment deleted successfully', 'success', 3000);
        })
        .catch(err => {
          toast(err.data.message, 'error', 3000);
        });
    }
  };

  const handleNextPage = () => {
    const nextPageNo = pageNumber + 1;
    dispatch(updateCurrentPage(nextPageNo));
  };

  const handlePreviousPage = () => {
    const nextPageNo = pageNumber - 1;
    dispatch(updateCurrentPage(nextPageNo));
  };

  const isEligibleForAddComment = () => {
    return isAuth;
  };

  const isEligibleForUpdateAndDeleteComment = (email: string) => {
    return localStorage.getItem('email') === email;
  };

  if (!isAuth) return null;

  return (
    <>
      {/* Add Comment */}
      {isEligibleForAddComment() && (
        <div className="space-y-3 px-1">
          <h3>Add a Comment</h3>
          <textarea
            className="form-input-field max-h-32 min-h-32 resize-none"
            placeholder="Write your comment..."
            rows={3}
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
          ></textarea>
          <div className="flex justify-end">
            <button
              //={isAddCommentLoading}
              disabled={isAddCommentLoading || commentContent.length === 0}
              onClick={addCommentHandler}
              className={
                commentContent.length === 0
                  ? 'btn-submit-disabled'
                  : 'btn-submit-enabled'
              }
            >
              Comment
            </button>
          </div>
        </div>
      )}

      {content.length > MIN_COMMENT_FOR_SHOW_TOP_PAGINATION && (
        <SimplePagination
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          currentPageNo={pageNumber}
          hasPrevious={hasPrevious}
          hasNext={hasNext}
          totalPages={totalPages}
        />
      )}

      {/* Comments List */}
      <h3 id="comment-list">Total Comments({totalComments})</h3>
      <div className="space-y-2 md:space-y-6 mt-6">
        {content.map(comment => (
          <div key={comment.commentId} className="flex gap-4 border-b pb-4">
            <div className="flex-shrink-0">
              {comment.userProfilePictureUrl ? (
                <img
                  src={comment.userProfilePictureUrl}
                  alt={comment.username[0]}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                  {comment.username.charAt(0)}
                </div>
              )}
            </div>

            <div className="w-full">
              <div className="flex items-center justify-between">
                <h4>{comment.username}</h4>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-200">
                  {new Date(comment.createdDate).toLocaleString()}
                </span>
              </div>

              {editCommentId === comment.commentId ? (
                <textarea
                  className="form-input-field max-h-32 min-h-32 resize-none"
                  rows={3}
                  value={editCommentContent}
                  //defaultValue={comment.content}
                  onChange={e => setEditCommentContent(e.target.value)}
                />
              ) : (
                <p className="text-sm md:text-base mt-1 md:mt-2 text-gray-900 dark:text-gray-50 break-words">
                  {comment.content}
                </p>
              )}

              {isEligibleForUpdateAndDeleteComment(comment.email) && (
                <div className="mt-2 flex gap-3 text-sm">
                  <button
                    className="text-teal-500 dark:text-teal-300 hover:underline"
                    onClick={() => {
                      setEditCommentContent(comment.content);
                      setEditCommentId(
                        editCommentId === comment.commentId
                          ? null
                          : comment.commentId
                      );
                    }}
                  >
                    {editCommentId === comment.commentId ? 'Cancel' : 'Update'}
                  </button>
                  {editCommentId === comment.commentId ? (
                    <button
                      disabled={
                        isUpdateCommentLoading ||
                        editCommentContent.length === 0
                      }
                      onClick={updateCommentHandler}
                      className={
                        editCommentContent.length === 0
                          ? 'btn-submit-disabled'
                          : 'btn-submit-enabled'
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <OnClickTrashIcon
                      handleRemover={() =>
                        deleteCommentHandler(comment.commentId)
                      }
                      absolute={false}
                      title="Comment Delete"
                      text="Delete"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <SimplePagination
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPageNo={pageNumber}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        totalPages={totalPages}
      />
    </>
  );
};

export default BlogComments;
