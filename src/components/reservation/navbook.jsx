import React, { useContext, useEffect, useState } from "react";
import "../../css/reservation/navbook.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-bootstrap";
import QRCode from "qrcode.react";
import IncludedExcluded from "./include";
import Overview from "../reservation/overview";
import Programline from "./programline";
import Reviews from "./reviews";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Navbook() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [bootCount, setBootCount] = useState(0);
  const [photoSessionCount, setPhotoSessionCount] = useState(0);
  const [weddingService, setWeddingService] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showProgram, setShowProgram] = useState(true);
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [activeComponent, setActiveComponent] = useState("overview");

  const handleNavClick = (component) => {
    setActiveComponent(component);
    document.body.classList.add("nav-active");
  };
  const handleBodyClick = () => {
    document.body.classList.remove("nav-active");
  };
  const decreaseCounter = (type) => {
    if (type === "adults" && adults > 0) {
      setAdults(adults - 1);
    } else if (type === "children" && children > 0) {
      setChildren(children - 1);
    } else if (type === "boot" && bootCount > 0) {
      setBootCount(bootCount - 1);
    } else if (type === "photoSession" && photoSessionCount > 0) {
      setPhotoSessionCount(photoSessionCount - 1);
    }
  };
  const increaseCounter = (type) => {
    if (type === "adults") {
      setAdults(adults + 1);
    } else if (type === "children") {
      setChildren(children + 1);
    } else if (type === "boot") {
      setBootCount(bootCount + 1);
    } else if (type === "photoSession") {
      setPhotoSessionCount(photoSessionCount + 1);
    }
  };
  const handleBookNow = () => {
    const data = {
      date: selectedDate,
      adults,
      children,
      bootCount,
      photoSessionCount,
      weddingService,
    };
    localStorage.setItem("reservationData", JSON.stringify(data));
    setQRCodeValue(
      `Date: ${selectedDate}\nAdults: ${adults}\nChildren: ${children}\Boot Count: ${bootCount}\Photo Session Count: ${photoSessionCount}\Wedding Service: ${weddingService}`
    );

    setShowQRCode(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const tips = adults * 750;
  const total =
    adults * 750 +
    bootCount * 250 +
    photoSessionCount * 500 +
    (weddingService ? 5000 : 0);

  const handleOverviewClick = () => {
    setShowOverview(true);
  };
  const handleProgramClick = () => {
    setShowProgram(true);
  };
  const handleSaveQRCode = () => {
    const canvas = document.querySelector(".qr canvas");

    // Check if the canvas element exists
    if (!canvas) {
      console.error("QR code canvas element not found.");
      return;
    }

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "qr_code.png";

    // Simulate a click on the link to trigger the download
    link.click();
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-7 ">
          {/* Navigation bar */}
          <nav className="navbar  navbar-expand-sm d-flex justify-content-between w-100 navbar-light bg">
            <ul
              className="navbar-nav nav-reservation"
              onClick={handleBodyClick}>
              <li
                className={`nav-item mr-2 ${
                  activeComponent === "overview" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "overview" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("overview")}>
                  Overview
                </NavLink>
              </li>
              <li
                className={`nav-item mr-2 ${
                  activeComponent === "program" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "program" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("program")}>
                  Program
                </NavLink>
              </li>
              <li
                className={`nav-item mr-2 ${
                  activeComponent === "includedExcluded" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "includedExcluded" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("includedExcluded")}>
                  What is Included & Excluded
                </NavLink>
              </li>
              <li
                className={`nav-item ${
                  activeComponent === "reviews" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "reviews" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("reviews")}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Render the active component based on the state */}
          {activeComponent === "overview" && <Overview />}
          {activeComponent === "program" && <Programline />}
          {activeComponent === "includedExcluded" && <IncludedExcluded />}
          {activeComponent === "reviews" && <Reviews />}
          {/* Show Overview or other components */}
          {/* {showOverview ? (
            <Overview />
          ) : ( 
       
            <>
               {showProgram ? (
            <Programline />
          ) : ( 
          
                // )}
            </>
          )} */}
        </div>

        <div className="col-md-4">
          <div className="card bill mt-4">
            {/* Card content */}
            <div className="card-header text-center qq">
              {/* Date picker */}
              <div
                className="input-group"
                style={{ display: "flex", justifyContent: "center" }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  className="form-control text-center"
                />
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fa-regular fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body ">
              <div className="form-group row">
                <label htmlFor="adults" className="col-sm-4  col-form-label">
                  <h5>Adults</h5>
                </label>
                <div className="col-sm-8">
                  <div className="input-group we1">
                    <i
                      className="fa-sharp fa-solid fa-circle-minus mt-1"
                      onClick={() => decreaseCounter("adults")}></i>
                    <input
                      type="number"
                      className="form-control innn text-center ml-4"
                      id="adults"
                      min="0"
                      value={adults}
                      readOnly
                    />
                    <i
                      className="fa-solid fa-circle-plus mt-1"
                      onClick={() => increaseCounter("adults")}></i>
                  </div>
                </div>
              </div>
              <div className="form-group row ">
                <label htmlFor="children" className="col-sm-4 col-form-label">
                  <h5>Children</h5>
                </label>
                <div className="col-sm-6">
                  <div className="input-group we">
                    <i
                      className="fa-sharp fa-solid fa-circle-minus mt-1"
                      onClick={() => decreaseCounter("children")}></i>
                    <input
                      type="number"
                      className="form-control innn ml-4 text-center "
                      id="children"
                      min="0"
                      value={children}
                      readOnly
                    />
                    <i
                      className="fa-solid fa-circle-plus mt-1"
                      onClick={() => increaseCounter("children")}></i>
                  </div>
                </div>
              </div>

              <div className="card-body mb-1 mr-auto children-adult">
                <p className="card-text">
                  <i className="fas fa-exclamation"></i> Children under 4 are
                  free.
                </p>
                <p className="card-text">
                  <i className="fas fa-exclamation"></i> For a full refund,
                  cancel at least 24 hours in advance of the start date of the
                  experience.
                </p>
              </div>
              <div className="form-group row">
                <h4 className="mb-4">Adttional services</h4>
                <label htmlFor="boot" className="col-sm-4 col-form-label">
                  <h5>
                    Boot <br /> (250 EGP)
                  </h5>
                  <p className="text-secondary">
                    {" "}
                    Boat cruise with a snorkeling stop
                  </p>
                </label>
                <div className="col-sm-6">
                  <div className="input-group we">
                    <i
                      className="fa-sharp fa-solid fa-circle-minus mt-1"
                      onClick={() => decreaseCounter("boot")}></i>
                    <input
                      type="number"
                      className="form-control innn text-center ml-4"
                      id="boot"
                      min="0"
                      value={bootCount}
                      readOnly
                    />
                    <i
                      className="fa-solid fa-circle-plus mt-1"
                      onClick={() => increaseCounter("boot")}></i>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="photoSession"
                  className="col-sm-4 col-form-label">
                  <h5>
                    {" "}
                    Photo Session <br />
                    (500EGP)
                  </h5>
                </label>
                <div className="col-sm-6">
                  <div className="input-group we">
                    <i
                      className="fa-sharp fa-solid fa-circle-minus mt-1"
                      onClick={() => decreaseCounter("photoSession")}></i>
                    <input
                      type="number"
                      className="form-control innn text-center ml-4"
                      id="photoSession"
                      min="0"
                      value={photoSessionCount}
                      readOnly
                    />
                    <i
                      className="fa-solid fa-circle-plus mt-1"
                      onClick={() => increaseCounter("photoSession")}></i>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-12 offset-sm-0 mb-5">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="weddingService"
                      checked={weddingService}
                      onChange={(e) => setWeddingService(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="weddingService">
                      <h5>
                        {" "}
                        Wedding Service <br /> (5000 EGP for package){" "}
                      </h5>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <br /> <br />
            <div className="card-footer mt-5">
              <strong>Adults x {adults}</strong> <br />
              <strong>Children x {children}</strong> <br />
              <strong>Boot x {bootCount}</strong> <br />
              <strong>photoSession x {photoSessionCount}</strong> <br />
              <strong>Total: {total}</strong> <br />
              <div className="text-center mt-4 ml-5">
                {showQRCode ? (
                  <div className="text-center qr">
                    <QRCode value={qrCodeValue} />
                  </div>
                ) : (
                  <button className="book" onClick={handleBookNow}>
                    Book Now
                  </button>
                )}
                {showQRCode && (
                  <button className="book" onClick={handleSaveQRCode}>
                    Save QR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
