import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import {
  BlogCommentState,
  updateCurrentPage,
} from '../../features/blog/blogCommentSlice';
import { useAddCommentMutation } from '../../features/blog/blogCommentApi';
import { useParams } from 'react-router-dom';
import { useToast } from '../../context/toast-context';
import SimplePagination from '../common/SimplePagination';

const BlogComments = () => {
  const MIN_COMMENT_FOR_SHOW_TOP_PAGINATION = 5;
  const { slug } = useParams();
  const toast = useToast();
  const dispatch = useDispatch();
  const blogState = useSelector((state: RootState) => state.blogComment);
  const { content, hasNext, hasPrevious, pageNumber, totalPages } =
    blogState as BlogCommentState;

  const [addComment, { isLoading: isAddCommentLoading }] =
    useAddCommentMutation();
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [commentContent, setCommentContent] = useState<string>('');

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

  const handleNextPage = () => {
    const nextPageNo = pageNumber + 1;
    dispatch(updateCurrentPage(nextPageNo));
  };

  const handlePreviousPage = () => {
    const nextPageNo = pageNumber - 1;
    dispatch(updateCurrentPage(nextPageNo));
  };

  return (
    <>
      {/* Add Comment */}
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Add a Comment
        </h3>
        <textarea
          className="form-input-field max-h-32 min-h-32 resize-none"
          placeholder="Write your comment..."
          rows={3}
          value={commentContent}
          onChange={e => setCommentContent(e.target.value)}
        ></textarea>
        <div className="mt-3 flex justify-end">
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
      <div className="space-y-6 mt-6">
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
                <h4 className="font-semibold text-xs md:text-sm text-gray-800">
                  {comment.username}
                </h4>
                <span className="text-xs md:text-sm text-gray-500">
                  {new Date(comment.createdDate).toLocaleString()}
                </span>
              </div>

              {editCommentId === comment.commentId ? (
                <textarea
                  className="form-input-field max-h-32 min-h-32 resize-none"
                  rows={3}
                  defaultValue={comment.content}
                />
              ) : (
                <p className="text-xs md:text-sm mt-1 md:mt-2 text-gray-700 break-words">
                  {comment.content}
                </p>
              )}

              <div className="mt-2 flex gap-3 text-sm">
                <button
                  className="text-green-500 hover:underline"
                  onClick={() =>
                    setEditCommentId(
                      editCommentId === comment.commentId
                        ? null
                        : comment.commentId
                    )
                  }
                >
                  {editCommentId === comment.commentId ? 'Cancel' : 'Update'}
                </button>
                {editCommentId === comment.commentId && (
                  <button className="text-white bg-green-500 px-3 py-1 rounded hover:bg-green-600">
                    Save
                  </button>
                )}
              </div>
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
