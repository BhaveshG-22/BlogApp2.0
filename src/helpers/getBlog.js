import axios from "axios";
import getApiLink from "../api";
export const getBlog = async (id) => {
  // const apiURL = "blog-server-cstqow679-bhaveshg-22.vercel.app";

  const apiURL = getApiLink();
  console.log(apiURL);

  const blogData = await axios.get(`${apiURL}/data/blog/${id}`);
  console.log(blogData.data.Blog);
  return blogData.data.Blog;
};
