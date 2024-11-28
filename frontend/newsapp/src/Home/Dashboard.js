import { Link, Outlet } from "react-router-dom"

export default function Dashboard(){
    <>
        <Navbar/>
        <Outlet/>
    </>
}

export function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <Link class="navbar-brand" to="/home">Navbar</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <Link class="nav-link" to="/home">Home <span class="sr-only">(current)</span></Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="about">About Us</Link>
                </li>
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" to="/home" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Dropdown
                    </Link>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link class="dropdown-item" to="/home">Action</Link>
                    <Link class="dropdown-item" to="/home">Another action</Link>
                    <div class="dropdown-divider"></div>
                    <Link class="dropdown-item" to="/home">Something else here</Link>
                    </div>
                </li>
                <li class="nav-item">
                    <Link class="nav-link disabled" to="/home">Disabled</Link>
                </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    )
}