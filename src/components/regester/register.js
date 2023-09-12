import React, { useState } from "react";
import "./register.css";
import { AxiosInstance } from '../../Utils/AxiosConfig';
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import { NavLink } from "react-router-dom";
const Register = () => {
//   const { loginState, setLoginState } = useContext(DataContext);
const [loginState, setLoginState] = useState();

  if(loginState){};
  // const [isJunior,setIsJunior] = useState(false);
  const defaultDetails = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    // reg_id: "",
    password: "",
    password1: "",
    // isJunior: "false",
  };



  const [userDetails, setUserDetails] = useState(defaultDetails);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    setUserDetails({ ...userDetails, [name]: value.trim() });

    if (name === 'isJunior') {
      setUserDetails({ ...userDetails, [name]: checked });
    }
    // e.tagrget==='isJunior'?
    // if(e.target.type=='checkbox') {

    //     setUserDetails({ ...userDetails, [name]: checked });

    // }
    // else{
    //     setUserDetails({ ...userDetails, [name]: value });
    // }

    // if('value' in e.target) {
    // this.setState({ [event.target.name]: event.target.value});

    // }

    // e.target.checked?setIsJunior(true):setIsJunior(false);

    // console.log(e.target.checked);

  };

  const navigate = useNavigate();

  const registerUser = (details) => {
    const registerEndpoint = "/api/register/";
    const id = toast.loading("Please wait...");
    setTimeout(() => {

    AxiosInstance.post(registerEndpoint,details)
            .then((response) => {
                // console.log("enter in then ");
                if (response.status) {
                    // console.log("enter in then if ");
                    toast.update(id, { render: "Registered  successfully !", type: "success", isLoading: false, autoClose:3000 })
                    navigate("/");
                    // <Navigate to="/instruction" />
                    // window.location.reload(true);
                    console.clear();
                
                }
                else {
                    toast.update(id, { render: response.data.error, type: "error", isLoading: false, autoClose:3000 })
                    // console.log("login failed");
                    console.clear();
                }
            })
            .catch((error) => {
              toast.update(id, { render: error.response.data.msg[0], type: "error", isLoading: false, autoClose:3000 })
              console.clear();
                // console.log("enter in error +",error.response);
            })
        }, 1000)
  };

  const submitDetails = (e) => {
    e.preventDefault();
    // console.log(userDetails);
    registerUser(userDetails);
  };

  // const handleCategoryChange = (e) =>{
  //   if(e.target.name == "junior"){
  //     setUserDetails({...userDetails, ["isJunior"]:true});
  //   }
  //   else{
  //     setUserDetails({...userDetails, ["isJunior"] : false})
  //   }
  // }

  return (
    <div className="fade-in">
      <div className="mt-0 p-sm-0 p-sm-1 ">
        <div className="container cont12 text-white p-3 p-sm-3 px-sm-4 mt-sm-0 log-style">
          <form onSubmit={submitDetails}>
            <div className="title mb-sm-3 mb-3 text-center">
              <h1>Sign Up</h1>
              <small className="d-none">
                Will be delightful to have you on board.
              </small>
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" First Name"
                name="first_name"
                value={userDetails.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" Last Name"
                name="last_name"
                value={userDetails.last_name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" Username"
                name="username"
                value={userDetails.Username}
                onChange={handleChange}
              />
            </div>

            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" Email address"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>


            <div className="input-group mb-2">
              <input
                type="password"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" Password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                checked
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="password"
                className="form-control form-control-lg fs-6 input-style-register"
                placeholder=" Confirm Password"
                name="password1"
                value={userDetails.password1}
                onChange={handleChange}
                checked
              />
            </div>

            {/* <div className="form-check"> 
              <label>Category : </label>
              <div class="form-check mx-5 ms-5">
                <input class="form-check-input" type="radio" id="flexRadioDefault1" name="isJunior" onClick={handleChange}/>
                <label class="form-check-label" htmlFor="flexRadioDefault1">
                  Junior
                </label>
              </div>

              <div class="form-check">
                <input class="form-check-input" type="radio" name="isJunior" id="flexRadioDefault2"  onClick={handleChange}/>
                <label class="form-check-label" htmlFor="flexRadioDefault2">
                  Senior
                </label>
              </div>

            </div> */}

            <div className="input-group mb-2">
              <button className="btn btn-lg w-100 rounded-2 fs-6 btn12">
                Register
              </button>
            </div>
            <div className="row forgot">
              <small className="d-flex">
                <span>
                Already a user?{" "}
                </span>
                <span>
                <NavLink
                  to="/login"
                  className="text-decoration-none"
                >
                  <span href="#" className="forgot-signup hover-link mx-2">
                    {" "}Sign In
                  </span>
                </NavLink>
                </span>
              </small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;