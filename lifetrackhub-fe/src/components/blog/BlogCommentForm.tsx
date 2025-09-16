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
  );
};

export default BlogCommentForm;
