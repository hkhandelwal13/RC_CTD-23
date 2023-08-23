import React from 'react';
import './login.css';
import { useState,useEffect } from "react";
import {Navigate} from "react-router-dom";
import { useNavigate } from "react-router";
import axios from 'axios';
import { AxiosInstance } from '../../Utils/AxiosConfig';
import { getToken } from '../../Utils/utils';
import {  toast } from 'react-toastify';
const endPoint = "/api/login/" 

export default function Login() {
    
    const navigate = useNavigate()
    const defaultCredentials ={
        username: "",
        password: "",
    }
    const [Logincred,setLogincred] = useState(defaultCredentials);

    const handleChange = (event) => {
        const Uname = event.target.name;
        const passw = event.target.value;
        setLogincred({ ...Logincred, [Uname]: passw.trim() });
    
    }
    
    const submitLoginForm = (e) => {
        e.preventDefault();
        userlogin(Logincred);
    
    }


        const userlogin = (loginPayload)=>{
            console.log("enter in login");
            const id = toast.loading("Please wait...");
            // toast.dark('This is Toast Notification for Dark');
            // toast.info('This is Toast Notification for Dark');
            // toast.success('This is Toast Notification for Dark');
            // toast.warn('This is Toast Notification for Warn');
            // toast.error('This is Toast Notification for Error');
            
            setTimeout(() => {

            AxiosInstance.post(endPoint,loginPayload)
            .then((response) => {
                console.log("enter in then ");
                if (response.status) {
                    console.log("enter in then if ");
                    localStorage.setItem("isLogin", true);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("isJunior", response.data.isJunior);
                    navigate("/instruction");
                    window.location.reload(true);
                    toast.update(id, { render: "Logged in successfully !", type: "success", isLoading: false, autoClose:3000 })
                    // <Navigate to="/instruction" />
                    // window.location.reload(true);
                
                }
                else {
                    toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                    console.log("login failed");
                }
            })
            .catch((error) => {
              toast.update(id, { render: error.response.data.msg, type: "error", isLoading: false, autoClose:3000 })
              console.clear();
                console.log("enter in error +",error.response);
            
                setLogincred(Logincred)
            })
        }, 1000)

    }

//  const handleChange =(e) => {}
        
return (
    <>


<form class="form" autocomplete="off"  onSubmit={submitLoginForm} >
  <div class="control">
    <h1>Login </h1>
  </div>
  <div class="control block-cube block-input">
    <input name="username" type="text" placeholder="Username"  required="true" onChange={handleChange} />
    <div class="bg-top">
      <div class="bg-inner"></div>
    </div>
    <div class="bg-right">
      <div class="bg-inner"></div>
    </div>
    <div class="bg">
      <div class="bg-inner"></div>
    </div>
  </div>
  <div class="control block-cube block-input">
    <input name="password" type="password" placeholder="Password"  required="true" onChange={handleChange} />
    <div class="bg-top">
      <div class="bg-inner"></div>
    </div>
    <div class="bg-right">
      <div class="bg-inner"></div>
    </div>
    <div class="bg">
      <div class="bg-inner"></div>
    </div>
  </div>


            <div className="im-buttons">
                <label className="radio" id="a-button">
                    <input name="im-buttons" type="radio" id="a-button" checked="checked" />
                    <span>Junior</span></label><label className="radio" id="b-button"><input name="im-buttons"
                        type="radio" id="b-button" /><span>Senior</span></label></div>

  <button class="btn block-cube block-cube-hover" type="submit">
    <div class="bg-top">
      <div class="bg-inner"></div>
    </div>
    <div class="bg-right">
      <div class="bg-inner"></div>
    </div>
    <div class="bg">
      <div class="bg-inner"></div>
    </div>
    <div class="text">Log In</div>
  </button>

</form>

</>
    
    )
}









    
