import React from 'react';
import DisplayBlog from '../../components/blog/DisplayBlog';

const DisplayBlogContainer: React.FC = () => {
  //   const { slug } = useParams(); // Or pass it as props
  //   const [blog, setBlog] = useState<Blog | null>(null);
  //   const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const fetchBlog = async () => {
  //       try {
  //         const res = await fetch(`/api/blogs/${slug}`);
  //         const data = await res.json();
  //         setBlog(data);
  //       } catch (error) {
  //         console.error('Error fetching blog:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (slug) {
  //       fetchBlog();
  //     }
  //   }, [slug]);

  //   if (loading) return <div>Loading...</div>;
  //   if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="flex items-center justify-center">
      <DisplayBlog />
    </div>
  );
};

export default DisplayBlogContainer;
