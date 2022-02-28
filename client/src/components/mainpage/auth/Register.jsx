import {useState} from 'react'
import {Link} from "react-router-dom";
import React from 'react'
import axios from 'axios'
const Register = () => {
    const [user,setUser] =useState({
        name:"",
        email:"",
        password:"",
    });
    const onChangeInput =(e) =>{
        const {name,value} = e.target;
        setUser({...user,[name]:value})
    };
    const registersubmit=async(e)=>{
        e.preventDefault();  // xoa quay tron
        try{
            await axios.post("/user/register",{...user});
            localStorage.setItem("firstLogin", true);
            window.location.href="/"

        }catch(error){
            alert(error.reponse.data.msg);
        }
    };
    return (
     <div className="user">
         <form onSubmit={registersubmit} >
             <h2>Register</h2>
             <input
           
           type="name" 
             name="name"
              value={user.name} 
              onChange={onChangeInput}
              placeholder='Name'
              />  
             <input type="email"
              name ="email" 
              value ={user.email} 
              autoComplete = "on" 
              placeholder='Email'
              onChange={onChangeInput}
              />
              <input type="password"
              name ="password" 
              value ={user.password} 
              autoComplete = "on" 
              placeholder='Password'
              onChange={onChangeInput}
              />
             <div className="user__btn">
                 <button>Register</button>
                 <Link to = "/login">Login</Link>
             </div>
         </form>
     </div>
         
    )
}

export default Register
