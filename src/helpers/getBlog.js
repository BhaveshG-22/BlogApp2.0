import axios from "axios";
export const getBlog = async (id) => {
  const apiURL = "https://blog-server-mauve-seven.vercel.app";

  const blogData = await axios.get(`${apiURL}/data/blog/${id}`);
  console.log(blogData.data.Blog);
  return blogData.data.Blog;
};
