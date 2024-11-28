import { useState } from "react"
import "./Register.css"
import { useNavigate } from "react-router-dom";
export default function Register(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setconfirmPassword] = useState("");
    const [error,setError] = useState(false);
    const navigation = useNavigate();

    async function handleRegister(e){
        e.preventDefault();
        if(confirmPassword !== password)
        {
            setError(true);
        }
        else
        {
            const url = "http://localhost:8080/register";
            try {
                const response = await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:email,password:password,name:name})});
                if(!response.ok)
                    throw new Error(`Response status: ${response.status}`);;
                const value = await response.text();
                console.log(value);
                if(value === "User Added")
                    navigation('/dashboard');
                else{

                }
            } catch (error) {
                console.error(error.message);
            }
        }
    }
    return(
        <div class="login-screen">
            <div class="form-container">
                <h2>Register</h2>
                <form method="post" onSubmit={handleRegister}>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="name" id="name" value={name} name="name" required onChange={(e)=>{setName(e.target.value)}}/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" value={password} name="password" required onChange={(e)=>{setPassword(e.target.value);setError(false)}}/>
                    </div>
                    <div class="form-group">
                        <label for="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} required onChange={(e)=>{setconfirmPassword(e.target.value);setError(false)}}/>
                        {error && <p style={{color:"red"}}>* The Passwords dont match.</p>}
                    </div>
                    <button type="submit" class="submit-btn">Register</button>
                </form> 
            </div>
        </div>
    )
}