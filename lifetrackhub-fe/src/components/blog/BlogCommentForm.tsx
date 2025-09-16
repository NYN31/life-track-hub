import React from 'react';

interface BlogCommentFormProps {
  commentContent: string;
  setCommentContent: (content: string) => void;
  addCommentHandler: () => void;
  isAddCommentLoading: boolean;
}

const BlogCommentForm: React.FC<BlogCommentFormProps> = ({
  commentContent,
  setCommentContent,
  addCommentHandler,
  isAddCommentLoading,
}) => {
  const MAX_CONTENT_LENGTH = 10000;
  return (
    <div className="space-y-3 px-1">
      <h3>Add a Comment</h3>
      <textarea
        className="form-input-field max-h-32 min-h-32 resize-none"
        placeholder="Write your comment..."
        rows={3}
        value={commentContent}
        onChange={e => setCommentContent(e.target.value)}
      ></textarea>
      {commentContent.length > MAX_CONTENT_LENGTH && (
        <p className="form-field-error">
          Comment exceeded max characters limit.
        </p>
      )}
      <div className="flex justify-end">
        <button
          disabled={
            isAddCommentLoading ||
            commentContent.length === 0 ||
            commentContent.length > MAX_CONTENT_LENGTH
          }
          onClick={addCommentHandler}
          className={
            commentContent.length === 0 ||
            commentContent.length > MAX_CONTENT_LENGTH
              ? 'btn-submit-disabled'
              : 'btn-submit-enabled'
          }
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default BlogCommentForm;
