import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BLOG_UPDATED_PATH } from '../../constants/title-and-paths';
import fallback from '../../assets/blogFallback.png';
import { extractMarkdownHeadings } from '../../helper/utils/extract-markdown-headings';
import { blogStatusColor } from '../../helper/utils/color-code';
import { BlogStatus } from '../../types/blog';
import { useSelector } from 'react-redux';
import {
  FaRegCommentDots,
  FaRegEdit,
  FaRegHeart,
  FaHeart,
} from 'react-icons/fa';
import OnClickButton from '../common/button/OnClickButton';
import MarkdownRenderer from './MarkdownRenderer';
import { ROLE } from '../../types/user';
import { RootState } from '../../app/store';
import BlogComments from './BlogComments';
import useAuth from '../../helper/hooks/useAuth';
import {
  useIsLikedQuery,
  useLikeUnlikeOperationOfBlogMutation,
} from '../../features/blog/blogLikeApi';
import { useEffect, useState } from 'react';
import { useToast } from '../../context/toast-context';

const DisplayBlog: React.FC<{
  blogData: any;
}> = ({ blogData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const auth = useSelector((state: RootState) => state.auth);
  const blogLike = useSelector((state: RootState) => state.blogLike);
  const blogComment = useSelector((state: RootState) => state.blogComment);
  const isAuth = useAuth();

  const { isError: isLikedBySlugError } = useIsLikedQuery(slug ?? '', {
    skip: !isAuth,
  });
  const [currentUserLikeInBlog, setCurrentuserLikeInBlog] = useState(false);

  const [triggerLikeUnlikeOperationOfBlog] =
    useLikeUnlikeOperationOfBlogMutation();

  const handleToggoleLikeOperation = async () => {
    await triggerLikeUnlikeOperationOfBlog(slug)
      .unwrap()
      .then(() => {
        setCurrentuserLikeInBlog(prev => !prev);

        toast(
          currentUserLikeInBlog ? 'You unlike the blog' : 'You like the blog',
          'info',
          5000
        );
      })
      .catch(err => {
        toast(err.data.message, 'error');
      });
  };

  useEffect(() => {
    if (isLikedBySlugError) {
      setCurrentuserLikeInBlog(false);
    } else {
      setCurrentuserLikeInBlog(true);
    }
  }, [isLikedBySlugError, slug]);

  const headings = extractMarkdownHeadings(blogData.content);

  const navigateFromBlogUpdatePage = () => {
    if (slug) {
      navigate(`${BLOG_UPDATED_PATH}/${slug}`);
    }
  };

  const blogLikeCommentStats = (likes: number, comments: number) => {
    const toggleLikeIcon = () => {
      if (currentUserLikeInBlog) {
        return (
          <FaHeart
            onClick={handleToggoleLikeOperation}
            className="w-5 h-5 cursor-pointer text-red-500"
          />
        );
      }

      return (
        <FaRegHeart
          onClick={handleToggoleLikeOperation}
          className="w-5 h-5 cursor-pointer hover:text-red-500"
        />
      );
    };

    return (
      <div className="flex items-center justify-center space-x-6 text-gray-600 dark:text-gray-300">
        <div className="flex items-center space-x-2 transition">
          {toggleLikeIcon()}
          <span className="text-sm font-medium">{likes}</span>
        </div>

        <a
          href="#comment-list"
          className="flex items-center space-x-2 hover:text-purple-500 cursor-pointer transition"
        >
          <FaRegCommentDots className="w-5 h-5" />
          <span className="text-sm font-medium">{comments}</span>
        </a>
      </div>
    );
  };

  const blogHeadingMenu = () => {
    return (
      <div className="md:w-1/4 hidden md:block md:order-2">
        <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto p-3 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-md scrollbar-hide">
          <h3>Headings</h3>
          <ul className="space-y-2 pt-2 text-sm dark:text-gray-200">
            {headings.map((heading, index) => {
              const headingId = heading.id.replace(/\s+/g, '-').toLowerCase();
              const activeId = location.hash.includes(headingId);

              return (
                <li key={index} className={`pl-${heading.level * 2} list-disc`}>
                  <a
                    href={`#${headingId}`}
                    className={`hover:underline ${
                      activeId
                        ? 'text-purple-700 font-semibold dark:text-purple-300'
                        : ''
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  const blogContent = () => {
    return (
      <>
        {/* Blog Author Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={blogData.user?.profileImagePath || fallback}
              alt="Author"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold dark:text-gray-200">
                {blogData.user.firstname} {blogData.user.lastname}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(blogData.createdDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          {(auth.email === blogData.user.email ||
            auth.role === ROLE.SUPER_ADMIN) && (
            <OnClickButton
              action={navigateFromBlogUpdatePage}
              text="Edit Blog"
              icon={<FaRegEdit size={18} />}
            />
          )}
        </div>

        <h1>{blogData.title}</h1>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Status:{' '}
          <span
            className={`inline-block ml-1 px-2 py-1 rounded ${
              blogStatusColor[blogData.status as BlogStatus]
            } dark:bg-gray-800 dark:text-gray-200`}
          >
            {blogData.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {blogData.tags.map((tag: string) => (
            <span key={tag} className="blog-tags">
              #{tag}
            </span>
          ))}
        </div>

        {/* Blog Cover Image */}
        <div className="flex items-center justify-center">
          <img
            src={blogData.coverImagePath}
            alt="Blog Cover"
            className="object-cover rounded-lg shadow"
            height="auto"
            width="auto"
          />
        </div>

        {isAuth &&
          blogLikeCommentStats(blogLike.totalLikes, blogComment.totalComments)}

        {/* Blog Content */}
        <div className="shadow-sm rounded-lg">
          <MarkdownRenderer content={blogData.content} />
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-screen">
      {blogHeadingMenu()}
      <div className="md:w-3/4 order-2 md:order-1 h-screen md:border-r md:border-gray-300 dark:md:border-gray-700 md:pr-4">
        <div className="flex flex-col gap-y-4 h-full overflow-y-auto scrollbar-hide">
          {blogContent()}

          {isAuth && <BlogComments />}
        </div>
      </div>
    </div>
  );
};

export default DisplayBlog;
