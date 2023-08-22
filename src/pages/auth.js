import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Msg, setMsg] = useState("");

  const handleFormTypeChange = (type) => {
    setEmail("");
    setPassword("");
    setFormType(type);
    setMsg("");
  };

  const handleForm = async (e) => {
    e.preventDefault();
    let link = "https://blog2-0-server.onrender.com/auth/" + formType;
    console.log(formBody);
    console.log(link);
    try {
      const response = await axios.post(link, {
        formBody,
      });
      console.log(response);
      if (response.data.message) {
        setMsg(response.data.message);
      } else {
        navigate("/");
        setMsg(response.data.token);
        localStorage.setItem("token", response.data.token);
      }
    } catch (error) {}
  };

  const formBody = {
    ...(formType === "signup" && { name: name }),
    username: email,
    password: password,
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6" style={{ maxWidth: "400px" }}>
          <div className="card bg-light">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">
                {formType === "login" ? "Login" : "Sign Up"}
              </h5>
              <div className="btn-group d-flex mb-3">
                <button
                  type="button"
                  className={`btn btn-primary ${
                    formType === "login" ? "active" : ""
                  }`}
                  onClick={() => handleFormTypeChange("login")}
                >
                  <i className="fa fa-sign-in-alt"></i> Login
                </button>
                <button
                  type="button"
                  className={`btn btn-primary ${
                    formType === "signup" ? "active" : ""
                  }`}
                  onClick={() => handleFormTypeChange("signup")}
                >
                  <i className="fa fa-user-plus"></i> Sign Up
                </button>
              </div>
              <form onSubmit={handleForm}>
                {formType === "signup" && (
                  <div className="form-group d-flex align-items-center">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span
                          className="input-group-text"
                          style={{ height: "38px" }}
                        >
                          <i className="fa fa-user"></i>
                        </span>
                      </div>
                      <input
                        name="name"
                        className="form-control"
                        placeholder="Full name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setMsg("");
                        }}
                      />
                    </div>
                  </div>
                )}
                <br />
                <div className="form-group d-flex align-items-center">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{ height: "38px" }}
                      >
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setMsg("");
                      }}
                    />
                  </div>
                </div>
                <br />
                <div className="form-group d-flex align-items-center">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        style={{ height: "38px" }}
                      >
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Enter password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setMsg("");
                      }}
                    />
                  </div>
                </div>
                <br />

                {Msg && (
                  <div
                    className={`alert alert-${
                      Msg.includes("successful") ? "success" : "danger"
                    }`}
                    role="alert"
                  >
                    {Msg}
                  </div>
                )}
                <div className="form-group">
                  <br />
                  <button type="submit" className="btn btn-primary btn-block">
                    {formType === "login" ? (
                      <>
                        <i className="fa fa-sign-in-alt"></i> Login
                      </>
                    ) : (
                      <>
                        <i className="fa fa-user-plus"></i> Create Account
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
