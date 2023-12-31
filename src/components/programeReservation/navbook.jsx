import React, { useContext, useEffect, useState } from "react";
import "../../css/programeReservation/navbook.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-bootstrap";
import QRCode from "qrcode.react";
import IncludedExcluded from "./include";
import Overview from "./overview";
import Programline from "./programline";
import Reviews from "./reviews";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { BookContext } from "../context/BookContext";

export default function Navbook() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [bootCount, setBootCount] = useState(0);
  const [photoSessionCount, setPhotoSessionCount] = useState(0);
  const [weddingService, setWeddingService] = useState(false);
  const [weddingServiceError, setWeddingServiceError] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showProgram, setShowProgram] = useState(true);
  const [qrCodeValue, setQRCodeValue] = useState("");
  const [activeComponent, setActiveComponent] = useState("overview");
  const { id } = useParams();
  const [program, setProgram] = useState();
  const auth = useContext(AuthContext);
  const book = useContext(BookContext);
  const [additionService, setAdditionService] = useState([]);
  const [reserService, setReserService] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(auth)
  const getAddtionService = () => {
    // console.log("dfghjkl");
    instance
      .get("AdditionalServices", {
        params: {
          userTypeId: auth.userTypeId ? auth.userTypeId : 1,
        },
      })
      .then((res) => {
        setAdditionService(res?.data?.data);
        setReserService(
          res?.data?.data?.map((erv) => {
            return {
              description: erv.description,
              id: erv.id,
              name: erv.name,
              pricePerAdult: erv.pricePerAdult,
              pricePerChild: erv.pricePerChild,
              count: 0,
            };
          })
        );
      })
      .catch((err) => {
        toast.warning("There is some thing went wrong");
      });
  };
  useEffect(() => {
    getAddtionService();
  }, []);
  const getProgramHandler = () => {
    instance
      .get(`Programs/${id}`)
      .then((res) => {
        setProgram(res?.data?.data);
      })
      .catch((err) => {
        toast.warning("check your internet");
      });
  };
  useEffect(() => {
    getProgramHandler();
  }, []);
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
    }
  };

  const increaseCounter = (type) => {
    if (type === "adults") {
      setAdults(adults + 1);
    } else if (type === "children") {
      setChildren(children + 1);
    }
  };

  const increaseService = (id) => {
    const indexOfService = reserService.findIndex((serv) => serv.id === id);

    // Check if the service with the specified id is found
    if (indexOfService !== -1) {
      const updatedService = {
        ...reserService[indexOfService],
        count:
          reserService[indexOfService].count >= 1
            ? 1
            : reserService[indexOfService].count + 1,
      };

      setReserService([
        ...reserService.slice(0, indexOfService),
        updatedService,
        ...reserService.slice(indexOfService + 1),
      ]);
    }
  };
  const decreaseService = (id) => {
    const indexOfService = reserService.findIndex((serv) => serv.id === id);

    // Check if the service with the specified id is found
    if (indexOfService !== -1) {
      const updatedService = {
        ...reserService[indexOfService],
        count:
          reserService[indexOfService].count <= 0
            ? 0
            : reserService[indexOfService].count - 1,
      };

      setReserService([
        ...reserService.slice(0, indexOfService),
        updatedService,
        ...reserService.slice(indexOfService + 1),
      ]);
    }
  };
  const total =
    adults * program?.pricePerAdult +
    children * program?.pricePerChild +
    reserService.reduce((acc, serv) => {
      // Check if the service is for adults or children
      const pricePerPerson = serv.pricePerAdult;
      return acc + serv.count * pricePerPerson;
    }, 0);
  const handleBookNow = () => {
    if (weddingService) {
      setWeddingServiceError(false);
      if (adults >= 1) {
        book.addBook({
          userId: auth?.id,
          programId: id,
          bookingDate: selectedDate,
          numberOfChild: children,
          numberOfAdults: adults,
          additionalServices: reserService
            .filter((ser) => ser.count > 0)
            .map((ser) => ({
              serviceId: ser.id,
              numberOfChild: children,
              numberOfAdults: adults,
            })),
          total: total,
        });
        // localStorage.setItem("reservationData", JSON.stringify(data));
        setQRCodeValue(
          `Date: ${selectedDate}\nAdults: ${adults}\nChildren: ${children}\n${book?.additionalServices
            ?.map((serv) => {
              const matchingService = additionService.find(
                (servs) => servs?.id === serv?.serviceId
              );
              if (matchingService) {
                return `${matchingService.name} count: ${serv.count}`;
              }
              return null;
            })
            .filter(Boolean)
            .join("\n")}`
        );
        setShowQRCode(true);
        if (token) {
          navigate("/booking");
        } else navigate("/signin");
      } else {
        toast.warning("Please put the number of Adults");
      }
    } else {
      setWeddingServiceError(true);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const tips = adults * program?.pricePerAdult;

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
  console.log(reserService);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-9 ">
          {/* Navigation bar */}
          <nav className="navbar  navbar-expand-lg d-flex justify-content-between w-100 navbar-light bg">
            <ul
              className="navbar-nav nav-reservation  "
              onClick={handleBodyClick}>
              <li
                className={`nav-item mr-5 ${
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
                className={`nav-item mr-5 ${
                  activeComponent === "program" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "program" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("program")}>
                  Details
                </NavLink>
              </li>
              <li
                className={`nav-item mr-5 ${
                  activeComponent === "includedExcluded" ? "active" : ""
                }`}>
                <NavLink
                  className={`nav-link o text-dark ${
                    activeComponent === "includedExcluded" ? "active-link" : ""
                  }`}
                  onClick={() => handleNavClick("includedExcluded")}>
                  Included & Excluded
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
        </div>

        <div className="overview-container mt-4 col-md-3">
          {/* Date picker */}
          <div className="card-header card-header text-center qq">
            {/* Date picker */}
            <div
              className="input-group mb-4"
              style={{ display: "flex", justifyContent: "center" }}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                className="form-control text-center first-date  ml-2"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fa-regular fa-calendar"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="additional-service-item col-md-6 ">
              {/* <div className="counter-item"> */}
              <p className=" mt-2">Adults</p>{" "}
            </div>
            <div className="input-group input-width  col-md-6">
              <i
                className="fa-sharp fa-solid fa-circle-minus"
                onClick={() => decreaseCounter("adults")}></i>
              <input
                type="number"
                className="form-control innn  "
                id="adults"
                min="0"
                value={adults}
                readOnly
              />
              <i
                className="fa-solid fa-circle-plus"
                onClick={() => increaseCounter("adults")}></i>
            </div>

            {/* </div> */}
          </div>
          <div className="row">
            <div className="additional-service-item col-md-6 ">
              {/* <div className="counter-item"> */}
              <p className=" mt-2">children</p>{" "}
            </div>
            <div className="input-group input-width  col-md-6">
              <i
                className="fa-sharp fa-solid fa-circle-minus"
                onClick={() => decreaseCounter("children")}></i>
              <input
                type="number"
                className="form-control innn  "
                id="children"
                min="0"
                value={children}
                readOnly
              />
              <i
                className="fa-solid fa-circle-plus"
                onClick={() => increaseCounter("children")}></i>
            </div>

            {/* </div> */}
          </div>

          <h5 className="mb-4  mt-3 ">Additional services</h5>

          <div className="additional-services ">
            {reserService?.map((serv) => {
              return (
                <div className="">
                  <div className=" ">
                    <p className="text-primary">{serv?.description}</p>
                  </div>
                  <div className="row">
                    <div className="additional-service-item col-md-6 ">
                      {/* <div className="counter-item"> */}
                      <p className=" mt-2">{serv?.name}</p>{" "}
                    </div>
                    <div className="input-group input-width  col-md-6">
                      <i
                        className="fa-sharp fa-solid fa-circle-minus"
                        onClick={() => decreaseService(serv?.id)}></i>
                      <input
                        type="number"
                        className="form-control innn  "
                        id="photoSession"
                        min="0"
                        value={serv?.count}
                        readOnly
                      />
                      <i
                        className="fa-solid fa-circle-plus"
                        onClick={() => increaseService(serv.id)}></i>
                    </div>

                    {/* </div> */}
                  </div>
                </div>
              );
            })}

            <div className="terms-conditions card-header">
              <div className="form-check">
                <input
                  required
                  className="form-check-input"
                  type="checkbox"
                  id="weddingService"
                  checked={weddingService}
                  onChange={(e) => setWeddingService(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="weddingService">
                  <p className="text-dark"> Terms & Conditions </p>
                </label>
                {weddingServiceError && (
                  <p className="text-danger">Accept Terms & conditions</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-between  fw-bold p-2">
              <strong>Adults x {adults}</strong>
              <strong>{program?.pricePerAdult} USD</strong>
            </div>
            <div className="d-flex justify-content-between  fw-bold p-2">
              <strong>Children x {children}</strong>
              <strong>{program?.pricePerChild} USD</strong>
            </div>
            {reserService.map((serv) => {
              return (
                <>
                  <div className="d-flex justify-content-between  fw-bold p-2">
                    <strong>
                      {serv?.name} x {serv?.count}
                    </strong>
                    <strong>{serv?.pricePerAdult} USD</strong>
                  </div>
                </>
              );
            })}
            <div className="d-flex justify-content-between  fw-bold p-2">
              <strong>Total: {total}</strong>
            </div>
            <div className="text-center mt-4">
              {/* <Link to="/booking"> */}
              <button className="book" onClick={handleBookNow}>
                Book Now
              </button>
              {/* </Link> */}
            </div>
          </div>
          <div className="card-body mt-5 mr-auto children-adult">
            <p className="card-text">
              <i className="fas fa-exclamation"></i> Children under 4 are free.
            </p>
            <p className="card-text">
              <i className="fas fa-exclamation"></i> For a full refund, cancel
              at least 24 hours in advance of the start date of the experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
