import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { BsCalendar, BsClock } from "react-icons/bs";
import { BookContext } from "../context/BookContext";
import { instance } from "../../api/axios";
import { toast } from "react-toastify";
import "../../css/booking/book.css";
import { AuthContext } from "../context/AuthContext";
import pay1 from "./pay1.PNG"
const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const book = useContext(BookContext);
  const [program, setProgram] = useState();
  const auth = useContext(AuthContext);
  const [additionService, setAdditionService] = useState([]);
  const [reserService, setReserService] = useState([]);
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
      .get(`Programs/${book?.programId}`)
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
  const handleDateChange = (date) => {
    setSelectedDate(date);
    book.addBook({ bookingDate: date });
  };
  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title mt-5 paytext">{program?.name}</h1>
      </div>
      <div className="reservation-banner mb-4">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mb-4">
            <img src={pay1} alt="Top Image" className="top-image" />
          </div>
        </div>
        <div className="col-md-5 float-right">
          {" "}
          <div className="payCard">
            <h2 className="fs-3">{program?.name}</h2>
            <div className="d-flex justify-content-between  fw-bold p-2">
              <p className="fs-5 fw-normal">Adults x {book?.numberOfAdults}</p>
              <p className="fs-5 fw-normal">{program?.pricePerAdult} USD</p>
            </div>
            <div className="d-flex justify-content-between fw-bold p-2">
              <p className="fs-5 fw-normal">Children x {book?.numberOfChild}</p>
              <p className="fs-5 fw-normal">{program?.pricePerChild} USD</p>
            </div>
            <h2 className="fs-3">Additional Services</h2>
            {book?.additionalServices?.map((serv) => {
              const matchingService = additionService.find(
                (servs) => servs?.id === serv?.serviceId
              );

              if (matchingService) {
                return (
                  <div
                    key={matchingService.id}
                    className="d-flex justify-content-between fw-bold p-2">
                    <p className="fs-5 fw-normal">
                      {matchingService.name} x{" "}
                      {serv?.numberOfChild + serv?.numberOfAdults}
                    </p>
                    <p className="fs-5 fw-normal">
                      {matchingService.pricePerAdult *
                        (serv?.numberOfChild + serv?.numberOfAdults)} {" "}
                      USD
                    </p>
                  </div>
                );
              }

              return null;
            })}
            <div className="d-flex justify-content-between fw-bold p-2 border-top">
              <p className="fs-4 ">Total</p>
              <p className="fs-4 ">{book?.total} USD</p>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="row">
            {/* <div className="col-md-12"> */}
              <div className="form-group">
                <label htmlFor="datePicker">Date:</label>
                <div className="input-group date-book">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <BsCalendar />
                    </span>
                  </div>
                  <DatePicker
                    id="datePicker"
                    selected={book.bookingDate}
                    onChange={handleDateChange}
                    className="form-control text-center "
                    dateFormat="dd/MM/yyyy"
                  />
                </div>
              </div>
            {/* </div> */}
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input type="email" id="email" className="form-control" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input type="text" id="fullName" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="request">Request:</label>
                <textarea
                  id="request"
                  className="form-control"
                  rows="3"></textarea>
              </div>
            </div>
          </div>
{/* 
          <div className="row">
            <div className="col-md-12">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="termsCheck"
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  Accept Terms & Conditions
                </label>
              </div>
            </div>
          </div> */}

          <div className="row mt-4 justify-content-evenly">
            <div className="col-md-4">
              <button
                onClick={()=>window.history.back()}
                type="button"
                style={{ width: "240px", height: "50px" }}
                className="returnn">
                Back
              </button>
            </div>

            <div className="col-md-4">
              <Link to="/payment">
                <button
                  type="button"
                  style={{ width: "10px", height: "50px" }}
                  className="returnn1 float-right">
                  Pay
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
