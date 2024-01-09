import React, { useContext, useEffect, useState } from "react";
import "../../css/profile/profile.css";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { withSSR } from "react-i18next";

const MyProfile = () => {
  const auth = useContext(AuthContext);
  const [fullName, setFullName] = useState(auth?.fullName);
  const [email, setEmail] = useState(auth?.email);
  const [phone, setPhone] = useState(auth?.phone);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wishlist,setWishList]=useState([]);
  const getWishListHandler=()=>{
    instance.get("Wishlists",
      {
        headers: {
          uid: auth.id,
        },
      },
    ).then((res)=>{
      setWishList(res?.data?.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  console.log(wishlist)
  useEffect(()=>{
    getWishListHandler()
  },[])
  const updateProfile = (e) => {
    e.preventDefault();
    instance
      .put("Profile/Client/UpdateProfile", {
        email: email,
        fullName: fullName,
        phone: phone,
        userId: auth.id,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changePassword=(e)=>{
    e.preventDefault();
    if(newPassword===confirmPassword){
      instance.put(
        "Profile/Client/ChangePassword",
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          userId: auth.id,
        },
        // {
        //   headers: {
        //     userId: auth.id,
        //   },
        // }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      toast.warning("Confirm Password not equal New Password")
    }
  }
  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic here
  //   // console.log({
  //   //   firstName,
  //   //   lastName,
  //   //   email,
  //   //   phone,
  //   //   currentPassword,
  //   //   newPassword,
  //   //   confirmPassword,
  //   //   city,
  //   //   country,
  //   //   address,
  //   // });
  //   // Reset form fields after submission

  //   setEmail("");
  //   setPhone("");
  //   setCurrentPassword("");
  //   setNewPassword("");
  //   setConfirmPassword("");
  // };

  return (
    <div>
      <div className="slider-text">
        <h1 className="slider-title">My profile</h1>
      </div>
      <div className="reservation-banner">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb" alt="" />
      </div>
      <div className="container mt-5">
        <div className="my-profile-section">
          <h2>Basic Info</h2>
          <form onSubmit={updateProfile}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="firstName">Full Name</label>
                  <input
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    value={phone}
                    name="phoneNumber"
                    id="phoneNumber"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-end">
              <div className="col-md-6">
                <button
                  type="submit"
                  style={{ width: "10px", height: "50px" }}
                  className="returnn1 float-right">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="my-profile-section mt-5">
          <h2>Security</h2>
          <form onSubmit={changePassword}>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                value={currentPassword}
                onChange={(e)=>setCurrentPassword(e.target.value)}
                type="password"
                id="currentPassword"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                type="password"
                id="newPassword"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                className="form-control"
              />
            </div>
            <div className="row justify-content-end">
              <div className="col-md-6">
                <button
                  type="submit"
                  style={{ width: "10px", height: "50px" }}
                  className="returnn1 float-right">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="my-profile-section mt-5 .flex-row">
          <h2>My Wishlist</h2>
          {/* Add your wishlist cards here */}
          <div className="justify-content-between mt-5 d-flex">
            {wishlist?.map((wish)=>{
              return(
                <div
                  className="card border-0"
                  style={{ width: "344px", height: "516px" }}>
                  <div className="top-left">
                    <p className="start-price start">
                      Start from <br />
                      <strong className="start-price"> {wish?.pricePerChild} USD </strong>
                    </p>
                  </div>
                  <div className="top-right">
                    <div className="circle">
                      <i className="fa-sharp fa-solid fa-heart fa-fade"></i>
                    </div>
                  </div>
                  <Link to="/programs">
                    <img src="Mask.png" alt="Image 1" className="card-img-top" />
                    <div className="card-body">
                      <h5 className="text-dark">{wish?.name}</h5>
                      <p className="card-text text-primary">{wish?.pricePerAdult} USD Per Person</p>
                      <p className="card-text text-primary">{wish?.pricePerChild} USD Per Children</p>
                      <Rating emptySymbol={<IoIosStarOutline  />} fullSymbol={<IoIosStar color="#F47732" />} initialRating={wish?.rate} readonly />

                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <Link to="/">
              <button
                type="button"
                style={{ width: "240px", height: "50px" }}
                className="returnn">
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
