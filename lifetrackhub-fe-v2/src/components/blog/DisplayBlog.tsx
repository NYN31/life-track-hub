import MarkdownPreview from '@uiw/react-markdown-preview';
import { useNavigate, useParams } from 'react-router-dom';
import { BLOG_UPDATED_PATH } from '../../constants/title-and-paths';
import fallback from '../../assets/blogFallback.png';
import { extractMarkdownHeadings } from '../../helper/utils/extract-markdown-headings';
import { blogStatusColor } from '../../helper/utils/color-code';
import { BlogStatus } from '../../types/blog';

const DisplayBlog: React.FC<{ blogData: any }> = ({ blogData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

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
          <h2 className="text-lg font-semibold mb-2">Headings</h2>
          <ul className="space-y-2 text-sm">
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

      <div className="md:w-3/4 order-2 md:order-1 h-screen md:border-r md:border-gray-300">
        <div className="flex flex-col gap-y-4 h-full overflow-y-auto scrollbar-hide">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{blogData.title}</h1>
            <button
              onClick={navigateFromBlogDetailsPage}
              className="mx-2 px-6 py-2 bg-blue-500 hover:bg-blue-700 text-gray-50 font-semibold rounded-lg transition duration-200 shadow-sm uppercase"
            >
              edit
            </button>
          </div>

          <div className="text-sm font-medium text-gray-500">
            Status:{' '}
            <span
              className={`inline-block px-2 py-1 rounded ${
                blogStatusColor[blogData.status as BlogStatus]
              }`}
            >
              {blogData.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blogData.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Blog Cover Image */}
          <div className="flex items-center justify-center">
            <img
              src={blogData.coverImagePath || fallback}
              alt="Blog Cover"
              className="object-cover rounded-lg shadow"
              height="auto"
              width="600"
            />
          </div>

          <div className="bg-white p-4">
            <MarkdownPreview source={blogData.content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBlog;
