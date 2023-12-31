import React, { useContext, useEffect, useState } from "react";
// import './SignInSignUp.css';
import "../../css/sign/sign.css";
import { NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import SignInSignUp from "./signinsignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
// import SignUpComponent from './signup';

const SignIn = () => {
  const [selectedOption, setSelectedOption] = useState("user");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = useContext(AuthContext)
  const navigate=useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    instance
      .post("Auth/Login", {
        email: userName,
        password,
      })
      .then((res) => {
        auth.login(res.data)
        localStorage.setItem("profile", JSON.stringify(res.data.data));
        setUserName("");
        setEmail("");
        setPassword("");
        navigate("/")
      });
  };
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const renderEmailLabel = () => {
    if (selectedOption === "company") {
      return <label htmlFor="">Company Email Address</label>;
    } else {
      return <label htmlFor="">E-mail</label>;
    }
  };

  return (
    <div>
      {/* <SignInSignUp/> */}
      <div className="overlay-sign">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <div className="btn-group-sign">
                <NavLink
                  to="/signin/user"
                  className={` nav-link o  ${
                    selectedOption === "user" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("user")}>
                  User
                </NavLink>
                <NavLink
                  to="/signin/company"
                  className={`nav-link o  ${
                    selectedOption === "company" ? "active" : ""
                  }`}
                  onClick={() => handleOptionChange("company")}>
                  Company
                </NavLink>
              </div>

              <h5 className="mt-2 mb-4">Sign In</h5>
              <form className="sign-in-form" onSubmit={handleSignIn}>
                <div className="form-group">
                  {renderEmailLabel()}
                  <input
                    type="user"
                    className="form-control"
                    placeholder="E-mail"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    className="form-check-label text-black"
                    htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-orange btn-block"
                  onClick={handleSignIn}>
                  Sign In
                </button>

                <div className="text-center mt-3">
                  <p>
                    Forgot your password? <a href="/">Reset Password</a>
                  </p>
                  <p>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
