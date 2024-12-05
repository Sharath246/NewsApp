import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/logoutUser";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const user = localStorage.getItem("User");
  async function logoutHandler() {
    const response = await logoutUser();
    localStorage.removeItem("User");
    sessionStorage.removeItem("User");
    if (response === "Success") navigate("/");
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ padding: "1%", marginBottom: "1%" }}
    >
      NewsApp
      <div
        className="collapse navbar-collapse"
        id="navbarNavDropdown"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="navbar-nav">
          <Link className="nav-link" to="/dashboard">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About Us
          </Link>
          <Link className="nav-link" to="topics">
            Topics
          </Link>
        </div>
        {user !== null ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div className="dropdown" style={Styles.profileDropDown}>
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={Styles.dropdownToggle}
              >
                <div style={Styles.circle}>P</div>
              </Link>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <div className="dropdown-item" onClick={logoutHandler}>
                    Logout
                  </div>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Your Activity
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="settings">
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

const Styles = {
  circle: {
    display: "flex",
    backgroundColor: "grey",
    borderRadius: "50%",
    height: "30px",
    width: "30px",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
  profileDropDown: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10px",
  } as React.CSSProperties,
  dropdownToggle: {
    display: "flex",
    alignItems: "center",
    padding: "0",
  },
};
