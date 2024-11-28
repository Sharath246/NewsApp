import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(false);
    const navigation = useNavigate();
    async function handleLogin(e){
        e.preventDefault();
        const url = "http://localhost:8080/login";
        try {
            const response = await fetch(url,{method:"GET",headers:{"Content-Type":"application/json","email":email}});
            if(!response.ok)
                throw new Error(`Response status: ${response.status}`);
            const val = await response.json();
            if(val)
                if(val.password === password)
                    navigation('/dashboard' );
                else
                    setError(true);
            else{
                setError(true);
            }
        } catch (error) {
            console.error("error ->   ",error.message);
        }
    }

    return(
        <div class="login-screen">
            <div class="form-container">
                <h2>Login</h2>
                <form method="get" onSubmit={handleLogin}>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={email} required onChange={(e)=>{setEmail(e.target.value);setError(false)}}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" value={password} name="password" required onChange={(e)=>{setPassword(e.target.value);setError(false)}}/>
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                    {error && <p style={{color:"red"}}>* Wrong Email or Password</p>}
                </form> 
            </div>
        </div>
    )
}