import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../helpers/isAuthenticated";
import Logo from "../assets/profile-icon.svg";

export const ComponentNavbar = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/auth", { replace: true });
  };

  const renderAuthLink = () => {
    if (isAuthenticated()) {
      return (
        <button className="btn btn-secondary mx-2" onClick={Logout}>
          Logout
        </button>
      );
    } else {
      return (
        <Link className="btn btn-primary mx-2" to="/auth">
          Login
        </Link>
      );
    }
  };

  return (
    <Navbar bg="dark">
      <Container className="h-10 lead lead-text ml-auto">
        <Link className="navbar-brand text-white " to="/">
          Home
        </Link>
        <Nav className="ml-auto">
          <Link className="navbar-brand text-white" to="/newBlog">
            Create New
          </Link>
          {renderAuthLink()}
          <Link
            className="navbar-brand rounded avatar text-bg-secondary rounded-circle"
            to="/profile"
          >
            <div
              className="text-white d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "30px" }}
            >
              <img src={Logo} alt="Profile Icon" />
            </div>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
