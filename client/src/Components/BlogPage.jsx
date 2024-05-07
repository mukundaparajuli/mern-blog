import { dummyBlogData } from "../config";
import BlogPost from "./BlogPost";

const BlogPage = () => {
  const blogs = dummyBlogData;
  return (
    <div className="flex justify-center items-center flex-col bg-[#D7DCDD]">
      {blogs.map((blog) => (
        <BlogPost {...blog} key={blog.index} />
      ))}
    </div>
  );
};

export default BlogPage;
