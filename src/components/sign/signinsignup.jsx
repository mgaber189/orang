import React, { useState } from "react";
// import './SignInSignUp.css';
import "../../css/sign/sign.css";
import { NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpComponent from "./signup";
import SignIn from "./signin";
const SignInSignUp = () => {
  const isSignIn = true; // Set this flag to determine whether to show the sign-in or sign-up component

  return (
    <div>
      <div className="sign-overlay"></div>
      <img src="3.jpg" alt="Background" className="background-image" />
      <div className="signup-info col-md-6">
        <h2 className="text-white">Creating an account is great for you!</h2>
        <p>
          Get access to exclusive deals, save travellers’ details for quicker
          bookings, and manage your upcoming bookings with ease!
        </p>
      </div>
      <div className="col-md-6 offset-md-6">
        {isSignIn ? <SignIn /> : <SignUpComponent />}
      </div>
    </div>
  );
};
export default SignInSignUp;
