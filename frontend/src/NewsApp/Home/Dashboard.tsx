import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/logoutUser";
import { setUserTopics } from "../api/setuserTopics";
import { topicContext } from "../Contexts/TopicContext";

export default function Dashboard() {
  const connection = new WebSocket('ws://localhost:9000/naive_predict')
  return (
    <topicContext.Provider value={connection}>
      <Navbar />
      <Outlet />
    </topicContext.Provider>
  );
}

export function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const user = localStorage.getItem("User") || sessionStorage.getItem("User");
  async function logoutHandler() {
    const response = await logoutUser();
    if(sessionStorage.getItem('TopicsChanged'))
    {
      const topics = sessionStorage.getItem('UserTopics') || localStorage.getItem('UserTopics')
      const email = localStorage.getItem('Email') || sessionStorage.getItem('Email')
      const topicsChange = await setUserTopics(topics,email);
      if(topicsChange === 'Success')
        sessionStorage.removeItem('TopicsChanged')
    }
    if (response === "Success") {
      localStorage.removeItem("User");
      sessionStorage.removeItem("User");
      navigate("/");
    }
  }

  function searchFunction() {
    navigate("topicNews/" + search);
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ padding: "1%", height: "100%" }}
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
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/about">
            About Us
          </Link>
          <Link className="nav-link" to="topics">
            Topics
          </Link>
          <Link className="nav-link" to="play">
            Play Games
          </Link>
          <Link className="nav-link" to="/DT">
            DT
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
                  <Link className="dropdown-item" to="l&b">
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
            <form className="form-inline" onSubmit={searchFunction}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search For A Topic"
                aria-label="Search"
                value={search}
                required={true}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
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
    cursor: "pointer",
  } as React.CSSProperties,
  dropdownToggle: {
    display: "flex",
    alignItems: "center",
    padding: "0",
  },
};
