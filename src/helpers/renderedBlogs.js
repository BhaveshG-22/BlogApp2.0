import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../helpers/getUsername";
import { Loader } from "../components/loader";
import getApiLink from "../api";

export const RenderedBlogs = () => {
  const [blogs, setBlogs] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // const apiURL = "blog-server-cstqow679-bhaveshg-22.vercel.app";
  const apiURL = getApiLink();
  console.log(apiURL);

  useEffect(() => {
    axios

      .get(`${apiURL}/data/getAllBlogs`)
      .then((response) => {
        console.log(response.data.Blogs);
        setBlogs(response.data.Blogs);
      })
      .catch((error) => {
        console.error("Error fetching Blogs:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let resp = await getUserData();
      console.log(resp);
      resp ? setUserName(resp.username) : setUserName("");
    };
    fetchData();
  }, []);

  function handelDelete(id) {
    // Get the token from the local storage
    const token = localStorage.getItem("token");

    // Create the headers object with the Authorization header
    const headers = {
      token,
    };

    // Make the DELETE request with the headers
    axios
      .delete(`${apiURL}/data/editBlog/` + id, {
        headers,
      })
      .then((response) => {
        console.log(response);
        removeBlogFromList(id);
      })
      .catch((error) => {
        console.error("Error deleting Blog:", error);
      });
  }

  const removeBlogFromList = (id) => {
    const newBlogs = blogs.filter((blog) => {
      return blog._id !== id;
    });
    setBlogs(newBlogs);
  };

  console.log(userName);
  return (
    <div className="centered">
      {blogs === null ? (
        <Loader />
      ) : blogs.length > 0 ? (
        <div>
          <br />
          <div className="row m-3">
            {blogs.map((blog) => (
              <div className="col-md-3 mb-3" key={blog._id}>
                <div className="card d-flex flex-column h-100">
                  <img
                    className="card-img-top thumbnail"
                    src={blog.thumbnailUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body d-flex flex-column">
                    <Link
                      to={`/blog/${blog._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h5 className="card-title mb-0">{blog.title}</h5>
                      {userName !== blog.username ? (
                        <>
                          <p className="card-text mb-1 mt-3">
                            {blog.description.length < 85
                              ? blog.description
                              : blog.description.slice(0, 84) + " ..."}
                          </p>
                          <p className="card-subtitle mb-0 text-muted mt-auto align-self-end">
                            {blog.username}
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="card-text mb-1">
                            {blog.description.length < 35
                              ? blog.description
                              : blog.description.slice(0, 34) + " ..."}
                          </p>
                          <p className="card-subtitle mb-2 text-muted">
                            {blog.username}
                          </p>
                        </>
                      )}
                    </Link>
                    <div className="mt-auto">
                      {userName === blog.username && (
                        <>
                          <button
                            onClick={(event) => {
                              event.stopPropagation();
                              // use navigate
                              navigate(`/edit/${blog._id}`);
                              console.log("clicked");
                            }}
                            className="btn btn-secondary"
                          >
                            EDIT
                          </button>

                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handelDelete(blog._id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2>Nothing to Show!</h2>
      )}
    </div>
  );
};
