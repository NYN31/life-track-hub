import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { useState } from 'react';
import { BlogCommentState } from '../../features/blog/blogCommentSlice';

const BlogComments = () => {
  const blogState = useSelector((state: RootState) => state.blogComment);

  const { content, hasNext, hasPrevious, pageNumber, totalPages } =
    blogState as BlogCommentState;

  const [editCommentId, setEditCommentId] = useState<number | null>(null);

  return (
    <div className="p-4">
      {/* Add Comment */}
      <div className="pb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Add a Comment
        </h3>
        <textarea
          className="w-full p-3 resize-none rounded-md border focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Write your comment..."
          rows={3}
        ></textarea>
        <div className="mt-3 flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Submit
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {content.map(comment => (
          <div key={comment.commentId} className="flex gap-4 border-b pb-4">
            {/* Avatar */}
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

            {/* Comment Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-800">
                  {comment.username}
                </h4>
                <span className="text-sm text-gray-500">
                  {new Date(comment.createdDate).toLocaleString()}
                </span>
              </div>

              {editCommentId === comment.commentId ? (
                <textarea
                  className="w-full mt-2 p-2 resize-none focus:outline-none rounded bg-gray-50"
                  rows={3}
                  defaultValue={comment.content}
                />
              ) : (
                <p className="mt-2 text-gray-700">{comment.content}</p>
              )}

              {/* Actions */}
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

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-3">
        <button
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          disabled={!hasPrevious}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {pageNumber + 1} of {totalPages}
        </span>
        <button
          className="px-3 py-1 border rounded-md text-sm disabled:opacity-50"
          disabled={!hasNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogComments;
