import React from 'react';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';

interface BlogCommentItemProps {
  comment: any;
  editCommentId: number | null;
  setEditCommentId: (id: number | null) => void;
  editCommentContent: string;
  setEditCommentContent: (content: string) => void;
  isUpdateCommentLoading: boolean;
  updateCommentHandler: () => void;
  setDeleteCommentId: (id: number) => void;
  setIsOpen: (isOpen: boolean) => void;
  isEligibleForUpdateAndDeleteComment: (email: string) => boolean;
}

const BlogCommentItem: React.FC<BlogCommentItemProps> = ({
  comment,
  editCommentId,
  setEditCommentId,
  setEditCommentContent,
  isUpdateCommentLoading,
  editCommentContent,
  updateCommentHandler,
  setDeleteCommentId,
  setIsOpen,
  isEligibleForUpdateAndDeleteComment,
}) => {
  return (
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
                  editCommentId === comment.commentId ? null : comment.commentId
                );
              }}
            >
              {editCommentId === comment.commentId ? 'Cancel' : 'Update'}
            </button>
            {editCommentId === comment.commentId ? (
              <button
                disabled={
                  isUpdateCommentLoading || editCommentContent.length === 0
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
                handleRemover={() => {
                  setDeleteCommentId(comment.commentId);
                  setIsOpen(true);
                }}
                absolute={false}
                title="Comment Delete"
                text="Delete"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCommentItem;
