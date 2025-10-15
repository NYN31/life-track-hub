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
import ConfirmDialog from '../common/ConfirmDialog';
import BlogCommentItem from './BlogCommentItem';
import BlogCommentForm from './BlogCommentForm';

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

  const [deleteCommentId, setDeleteCommentId] = useState<number>(-1);
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const deleteCommentHandler = async () => {
    console.log('Comment ID: ', deleteCommentId);
    await deleteComment({
      commentId: deleteCommentId,
      slug,
      currentPage: pageNumber,
    })
      .unwrap()
      .then(res => {
        dispatch(updateBlogComment(res));
        toast('Comment deleted successfully', 'success', 3000);
      })
      .catch(err => {
        toast(err.data.message, 'error', 3000);
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
        <BlogCommentForm
          commentContent={commentContent}
          setCommentContent={setCommentContent}
          addCommentHandler={addCommentHandler}
          isAddCommentLoading={isAddCommentLoading}
        />
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
          <BlogCommentItem
            comment={comment}
            editCommentId={editCommentId}
            setEditCommentId={setEditCommentId}
            setEditCommentContent={setEditCommentContent}
            isUpdateCommentLoading={isUpdateCommentLoading}
            editCommentContent={editCommentContent}
            updateCommentHandler={updateCommentHandler}
            setDeleteCommentId={setDeleteCommentId}
            setIsModalOpen={setIsModalOpen}
            isEligibleForUpdateAndDeleteComment={
              isEligibleForUpdateAndDeleteComment
            }
          />
        ))}
      </div>

      {isModalOpen && (
        <ConfirmDialog
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          proceedAction={deleteCommentHandler}
          actionName="Delete comment"
        />
      )}

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
