import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => navigate("/profile");
  const handleAddRecipeClick = () => navigate("/add-recipe");
  const handleAboutClick = () => navigate("/about");

  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold text-white" to="/">
          RECIPEDIA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dashboard
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleProfileClick}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleAddRecipeClick}
                  >
                    Add Recipe
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleAboutClick}>
                    About
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex">
            <Link className="btn btn-outline-light btn-sm mx-1" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-light btn-sm mx-1" to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
