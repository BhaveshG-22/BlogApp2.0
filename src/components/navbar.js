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
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <Nav className="ml-auto">
          <Link className="navbar-brand" to="/newBlog">
            Create New
          </Link>
          {renderAuthLink()}
          <Link className="navbar-brand" to="/profile">
            <img src={Logo} alt="Profile Icon" />
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
