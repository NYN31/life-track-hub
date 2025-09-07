import { useNavigate, useParams } from 'react-router-dom';
import { BLOG_UPDATED_PATH } from '../../constants/title-and-paths';
import fallback from '../../assets/blogFallback.png';
import { extractMarkdownHeadings } from '../../helper/utils/extract-markdown-headings';
import { blogStatusColor } from '../../helper/utils/color-code';
import { BlogStatus } from '../../types/blog';
import { useSelector } from 'react-redux';
import { FaRegEdit } from 'react-icons/fa';
import OnClickButton from '../common/button/OnClickButton';
import MarkdownRenderer from './MarkdownRenderer';
import { ROLE } from '../../types/user';

const DisplayBlog: React.FC<{ blogData: any }> = ({ blogData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state: any) => state.auth);

  const headings = extractMarkdownHeadings(blogData.content);

  const navigateFromBlogDetailsPage = () => {
    if (slug) {
      navigate(`${BLOG_UPDATED_PATH}/${slug}`);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-screen">
      <div className="md:w-1/4 hidden md:block md:order-2 ">
        <div className="md:pl-4 h-full overflow-y-auto scrollbar-hide">
          <h3>Headings</h3>
          <ul className="space-y-2 text-sm dark:text-gray-200">
            {headings.map((heading, index) => {
              return (
                <li key={index} className={`pl-${heading.level * 2} list-disc`}>
                  <a
                    href={`#${heading.id.replace(/\s+/g, '-').toLowerCase()}`}
                    className="hover:underline"
                  >
                    {heading.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="md:w-3/4 order-2 md:order-1 h-screen md:border-r md:border-gray-300 dark:md:border-gray-700 md:pr-4">
        <div className="flex flex-col gap-y-4 h-full overflow-y-auto scrollbar-hide">
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
                action={navigateFromBlogDetailsPage}
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

          {/* Blog Content */}
          <div className="shadow-sm rounded-lg md:6 lg:8">
            <MarkdownRenderer content={blogData.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBlog;
