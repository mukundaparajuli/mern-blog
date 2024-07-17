const useFindBlogById = (_id) => {
  const getAllBlogs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/blogs`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // if(data.map((blog)))
        const Blog = data.includes({ _id });
        return Blog;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAllBlogs();
};

export default useFindBlogById;
