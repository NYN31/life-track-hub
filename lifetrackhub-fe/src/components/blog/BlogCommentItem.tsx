import React from 'react';
import OnClickTrashIcon from '../common/button/OnClickTrashIcon';

import { Dispatch, SetStateAction } from 'react';

interface BlogCommentItemProps {
  comment: any;
  editCommentId: number | null;
  setEditCommentId: Dispatch<SetStateAction<number | null>>;
  editCommentContent: string;
  setEditCommentContent: Dispatch<SetStateAction<string>>;
  isUpdateCommentLoading: boolean;
  updateCommentHandler: () => void;
  setDeleteCommentId: Dispatch<SetStateAction<number>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
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
  setIsModalOpen,
  isEligibleForUpdateAndDeleteComment,
}) => {
  const MAX_CONTENT_LENGTH = 10000;
  const [openFullComment, setOpenFullComment] = React.useState(false);

  const getFullContent = (content: string) => {
    if (content.length <= 300) return content;

    return (
      <>
        {content}...
        <button
          className="text-purple-500 dark:text-purple-300 hover:underline ml-2"
          onClick={() => setOpenFullComment(false)}
        >
          Read less
        </button>
      </>
    );
  };

  const getShortContent = (content: string) => {
    if (content.length <= 300) return content;
    const comment = content.substring(0, 300);

    return (
      <>
        {comment}...
        <button
          className="text-purple-500 dark:text-purple-300 hover:underline ml-2"
          onClick={() => setOpenFullComment(true)}
        >
          Read more
        </button>
      </>
    );
  };

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
          <div className="mt-2 gap-2 flex flex-col">
            <textarea
              className="form-input-field max-h-32 min-h-32 resize-none"
              rows={3}
              value={editCommentContent}
              onChange={e => setEditCommentContent(e.target.value)}
            />
            {editCommentContent.length > MAX_CONTENT_LENGTH && (
              <p className="form-field-error">
                Comment exceeded max characters limit.
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm md:text-base mt-1 md:mt-2 text-gray-900 dark:text-gray-50 break-words">
            {openFullComment
              ? getFullContent(comment.content)
              : getShortContent(comment.content)}
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
                  isUpdateCommentLoading ||
                  editCommentContent.length === 0 ||
                  editCommentContent.length > MAX_CONTENT_LENGTH
                }
                onClick={updateCommentHandler}
                className={
                  editCommentContent.length === 0 ||
                  editCommentContent.length > MAX_CONTENT_LENGTH
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
                  setIsModalOpen(true);
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
