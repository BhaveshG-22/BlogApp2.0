import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBlog } from "../helpers/getBlog";
// import ReactMarkdown from "https://esm.sh/react-markdown@7?bundle";
import MDEditor from "@uiw/react-md-editor";

export const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const resp = await getBlog(id);
      setData(resp);
    };

    fetchData();
  }, [id]);

  console.log(data);
  return data === null ? (
    <Navigate to="/" />
  ) : (
    <div className="mx-4">
      <br />
      <h2>{data.title}</h2>
      <h6 className="text-muted">-by {data.username}</h6>
      <br />

      <div data-color-mode="light">
        <MDEditor.Markdown source={data.body} />
      </div>
    </div>
  );
};
