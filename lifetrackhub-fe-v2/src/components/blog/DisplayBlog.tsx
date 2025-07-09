import MarkdownPreview from '@uiw/react-markdown-preview';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BLOG_CREATED_PATH,
  BLOG_UPDATED_PATH,
} from '../../constants/title-and-paths';
import fallback from '../../assets/blogFallback.png';
import { extractMarkdownHeadings } from '../../helper/utils/extract-markdown-headings';

const DisplayBlog: React.FC<{ blogData: any }> = ({ blogData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const headings = extractMarkdownHeadings(blogData.content);

  const navigateFromBlogDetailsPage = () => {
    if (slug) {
      navigate(`${BLOG_UPDATED_PATH}/${slug}`);
    } else {
      navigate(`${BLOG_CREATED_PATH}`);
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
              className="mx-2 px-6 py-2 bg-purple-300 text-gray-700 font-semibold rounded-lg hover:bg-purple-700 transition duration-200 shadow-sm"
            >
              edit
            </button>
          </div>

          <div className="text-sm font-medium text-gray-500">
            Visibility:{' '}
            <span
              className={`inline-block px-2 py-1 rounded ${
                blogData.visibility === 'PUBLIC'
                  ? 'bg-green-100 text-green-800'
                  : blogData.visibility === 'PRIVATE'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {blogData.visibility}
            </span>
          </div>

          <div className="text-sm font-medium text-gray-500">
            Content Type:{' '}
            <span
              className={`inline-block px-2 py-1 rounded ${
                blogData.contentType === 'PUBLISHED'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {blogData.contentType}
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
