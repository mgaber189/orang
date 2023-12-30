import React, { useContext, useState } from "react";
// import './SignInSignUp.css';
import "../../css/sign/sign.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import SignInSignUp from "./signinsignup";
import { instance } from "../../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const SignUpComponent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const auth = useContext(AuthContext)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    if(password===confirmPassword){
      // Create a new FormData object
      const formData = new FormData();
    
      // Append form fields to the FormData object
      formData.append("UserName", fullName);
      formData.append("FullName", fullName);
      formData.append("Phone", phoneNumber);
      formData.append("UserTypeId", "1"); // Make sure to convert to a string if needed
      formData.append("Email", email);
      formData.append("Password", password);
    
      // Make the POST request with the FormData
      instance
        .post("Auth/Register", formData)
        .then((res) => {
          auth.login(res?.data)
          toast.success("Sign up success");
          // Clear the form fields
          setFullName("");
          setEmail("");
          setPhoneNumber("");
          setAddress("");
          setPassword("");
          navigate("/")
  
        })
        .catch((err) => {
          console.log(err);
          toast.error("Sign up failed");
        });

    }else{
      toast.warning("password not equal the confirm password")
    }
  };
  return (
    <div>
      {/* <SignInSignUp/> */}
      <div className="sign-overlay"></div>
      <img src="3.jpg" alt="Background" className="background-image" />
      <div className="signup-info col-md-6">
        <h2 className="text-white">Creating an account is great for you!</h2>
        <p>
          Get access to exclusive deals, save travellers’ details for quicker
          bookings, and manage your upcoming bookings with ease!
        </p>
      </div>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-6 overlay-signup">
              <h2 className="text-center mt-3">Sign Up</h2>
              <form className="sign-up-form" onSubmit={handleSignUp}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Confirm Password"
                      value={ confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span
                        className="input-group-text"
                        onClick={togglePasswordVisibility}>
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-orange btn-block">
                  Sign Up
                </button>
              </form>
            </div>
            <div className="col-md-6 ">
              {/* <div className="signup-info">
                <h2>Creating an account is great for you!</h2>
                <p>
                  Get access to exclusive deals, save travellers’ details for quicker bookings, and manage your upcoming
                  bookings with ease!
                </p>
                <p>
                  Already have an account? <a href="/">Sign In</a>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUpComponent;
