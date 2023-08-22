import axios from "axios";
export const getBlog = async (id) => {
  const blogData = await axios.get(
    `https://blog2-0-server.onrender.com/data/blog/${id}`
  );
  console.log(blogData.data.Blog);
  return blogData.data.Blog;
};
