import { Link, Outlet } from "react-router-dom"

export default function Dashboard(){
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
}

export function Navbar(){
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/home">
          NewsApp
        </Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/dashboard/">
                Home <span class="sr-only">(current)</span>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="about">
                About Us
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="topics">
                Topics
              </Link>
            </li>
          </ul>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            LogOut
          </button>
        </div>
      </nav>
    );
}