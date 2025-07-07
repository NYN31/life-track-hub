import MarkdownPreview from '@uiw/react-markdown-preview';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BLOG_CREATED_PATH,
  BLOG_UPDATED_PATH,
} from '../../constants/title-and-paths';
import fallback from '../../assets/blogFallback.png';

const DisplayBlog: React.FC<{ blogData: any }> = ({ blogData }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const navigateFromBlogDetailsPage = () => {
    if (slug) {
      navigate(`${BLOG_UPDATED_PATH}/${slug}`);
    } else {
      navigate(`${BLOG_CREATED_PATH}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto w-full p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{blogData.title}</h1>
        <button
          onClick={navigateFromBlogDetailsPage}
          className="px-6 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 shadow-sm"
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

      <div className="flex flex-wrap gap-2">
        {blogData.tags.split(',').map((tag: string) => (
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
  );
};

export default DisplayBlog;
