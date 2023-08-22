import React, { useEffect, useState } from "react";
import { Loader } from "../components/loader";

import MDEditor from "@uiw/react-md-editor";

import { Container, Form, Button } from "react-bootstrap";
import { getUsername } from "../helpers/getUsername.js";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog } from "../helpers/getBlog.js";
import { storage } from "../firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const Edit = () => {
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [Msg, setMsg] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    "data:image/jpeg;base64,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"
  );
  const [LoaderState, setLoaderState] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchBlog() {
      const resp = await getBlog(id);
      console.log(resp);
      setBody(resp.body);
      setDescription(resp.description);
      setTitle(resp.title);
      setThumbnailUrl(resp.thumbnailUrl);
      setLoaderState(false);
    }
    fetchBlog();
  }, []);

  useEffect(() => {
    async function fetchUsername() {
      const fetchedUsername = await getUsername();
      setUsername(fetchedUsername);
    }
    fetchUsername();
    console.log(username);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("line 24", formData);
    handelSave(formData);
    setTimeout(() => {
      navigate(`/blog/${id}`);
    }, 3500);
  };

  async function handelSave(data) {
    console.log(data);
    try {
      const save = await axios.put(
        `https://blog2-0-server.onrender.com/data/editBlog/${id}`,
        {
          data,
        }
      );
      console.log("successfully saved");
      setMsg({ data: "Saved Successfully", success: true });
    } catch (error) {
      console.error();
      setMsg({ data: "Server Error , Try Later!", success: false });
    }
  }

  const formData = {
    title,
    description,
    body,
    username,
    thumbnailUrl,
  };

  const uploadImage = (imgUpload) => {
    console.log("here");
    if (imgUpload == null) {
      console.log("nothing to upload ");
      setThumbnailUrl(null);
      return;
    }

    const imageRef = ref(storage, `thumbnails/${imgUpload.name + v4()}`);

    uploadBytes(imageRef, imgUpload)
      .then(async (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload progress: " + progress + "%");
        console.log("Uploaded successfully");
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          setThumbnailUrl(url);
        });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  return LoaderState ? (
    <div className="centered ">
      <Loader size={"75"} />
    </div>
  ) : (
    <Container className="parent">
      <br />

      <Form onSubmit={handleSubmit}>
        {Msg.data ? (
          <div
            className={`alert ${
              Msg.success ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            <div className="d-inline">{Msg.data}</div>
            <Loader className="d-inline" size={"15"} />
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <h1 className="mb-4">Edit Article</h1>
            {username ? (
              <p className="ms-3">{username}</p>
            ) : (
              <p className="ms-3"> Loading...</p>
            )}
          </div>
        )}

        <div className="row">
          <div className="col-md-6">
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-6 gap-3">
            <div className="thumbnail-container text-center">
              <img
                className="thumbnail-img"
                src={thumbnailUrl}
                alt="Uploaded"
              />
              <input
                type="file"
                className="p-2 mt-2"
                onChange={async (event) => {
                  await uploadImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
        </div>
        <Form.Group controlId="body">
          <Form.Label>Text</Form.Label>
          <div data-color-mode="light">
            <MDEditor
              value={body}
              onChange={(val) => {
                setBody(val);
                // setValue(val);
              }}
            />
          </div>
        </Form.Group>
        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
          <Button className="btn-secondary mt-2 me-md-2" href="/">
            Cancel
          </Button>
          <Button className="btn-primary mt-2" type="submit">
            Save
          </Button>
        </div>
        <br />
      </Form>
    </Container>
  );
};
