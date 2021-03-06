import {useState} from 'react'
import {Link} from "react-router-dom";
import React from 'react'
import axios from 'axios'
const Login = () => {
    const [user,setUser] =useState({
        email:"",
        password:"",
    });
    const onChangeInput =(e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    };
    const loginsubmit=async(e)=>{
        e.preventDefault();  // xoa quay tron
        try{
            await axios.post("/user/login",{...user});
            localStorage.setItem("firstLogin", true);
            window.location.href="/"

        }catch(error){
            alert(error.reponse.data.msg);
        }
    };
    return (
     <div className="user">
         <form onSubmit={loginsubmit} >
             <h2>Login</h2>
             <input type
             ="email" 
             name="email"
              value={user.email} 
              onChange={onChangeInput}
              placeholder='Email'
              />  
             <input type="password"
              name ="password" 
              autoComplete = "on" 
              value ={user.password} 
              onChange={onChangeInput}
              placeholder='Password'
              />
             <div className="user__btn">
                 <button>Login</button>
                 <Link to = "/register">Register</Link>
             </div>
         </form>
     </div>
         
    )
}

export default Login
