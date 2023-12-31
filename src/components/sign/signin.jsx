import React, { useContext, useEffect, useRef, useState } from "react";
// import './SignInSignUp.css';
import "../../css/sign/sign.css";
import { Button, Modal, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./signin.css";
import SignInSignUp from "./signinsignup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
// import SignUpComponent from './signup';

const SignIn = () => {
  const [selectedOption, setSelectedOption] = useState("user");
  const model = useRef();
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSignIn = (e) => {
    e.preventDefault();
    instance
      .post("Auth/Login", {
        email: userName,
        password,
      })
      .then((res) => {
        // auth.login(res.data)
        localStorage.setItem("profile", JSON.stringify(res?.data?.data));
        localStorage.setItem("token", res?.data?.data?.token);
        auth.login(res?.data?.data);
        setUserName("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        // Handle error, display an error message to the user, etc.
        console.error("Sign-in failed:", error);
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
  const resetPassword = () => {
    instance
      .put("Auth/ResetPassword", {
        email: userName,
      })
      .then((res) => {
        setUserName("");
        setShow(false)
        toast.success("Please check your E-Mail inbox");
      })
      .catch((err) => {
        toast.warning(err?.response?.data?.message);
      });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={resetPassword}>
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>

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
                      Forgot your password?{" "}
                      <button
                        onClick={() => setShow(true)}
                        type="button"
                        class="p-0 bg-transparent  text-primary fw-normal">
                        Reset Password
                      </button>
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
    </>
  );
};
export default SignIn;
