import { Link } from "react-router"

export default function Landing(){
    return(
        <div>
            Hello There!! Welcome to News App
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/about">About</Link>
        </div>
    )
}