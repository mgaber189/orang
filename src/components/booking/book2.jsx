import React, { useContext, useEffect, useState } from "react";
import "../../css/booking/book.css";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../../api/axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { BookContext } from "../context/BookContext";
const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("");
  const book = useContext(BookContext);
  const [program, setProgram] = useState();
  const auth = useContext(AuthContext);
  const [additionService, setAdditionService] = useState([]);
  const [reserService, setReserService] = useState([]);
  const navigate = useNavigate();
  const getAddtionService = () => {
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
  const handleMethodClick = (method) => {
    setSelectedMethod(method);
  };
  const reservationHandler = () => {
    instance
      .post("Reservation", {
        userId: book?.userId,
        programId: book?.programId,
        bookingDate: book?.bookingDate,
        numberOfChild: book?.numberOfChild,
        numberOfAdults: book?.numberOfAdults,
        additionalServices: book?.additionalServices,
        persons: [
          {
            name: "string",
            email: "string@kkk.com",
            phone: "01111111111",
            type: 0,
          },
        ],
      })
      .then((res) => {
        console.log(res);
        navigate("/qrbook");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title mt-5 paytext">{program?.name}</h1>
      </div>
      <div className="reservation-banner">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb" alt="" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center mt-4 mb-4">
            <img src="pay2.png" alt="Top Image" className="top-image" />
          </div>
        </div>
        <div className="col-md-5 float-right">
          {" "}
          <div className="payCard">
            <h2 className="fs-2">{program?.name}</h2>
            <div className="d-flex justify-content-between  fw-bold p-2">
              <p className="fs-5 fw-normal">Adults x {book?.numberOfAdults}</p>
              <p className="fs-5 fw-normal">{program?.pricePerAdult}USD</p>
            </div>
            <div className="d-flex justify-content-between fw-bold p-2">
              <p className="fs-5 fw-normal">Children x {book?.numberOfChild}</p>
              <p className="fs-5 fw-normal">{program?.pricePerChild}USD</p>
            </div>
            <h2 className="fs-2">Additional Services</h2>
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
                        (serv?.numberOfChild + serv?.numberOfAdults)}
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
          <div className="row mb-5">
            <div className="col-md-12">
              {/* Payment Method Images */}
              <div className="payment-methods">
                <img
                  className={`payment-method-img ${
                    selectedMethod === "visa" ? "selected" : ""
                  }`}
                  style={{ width: "190px", height: "50px" }}
                  src="visa.png"
                  alt="Visa"
                  onClick={() => handleMethodClick("visa")}
                />
                <img
                  className={`payment-method-img ml-4 ${
                    selectedMethod === "paypal" ? "selected" : ""
                  }`}
                  src="paypal.png"
                  style={{ width: "190px", height: "50px" }}
                  alt="PayPal"
                  onClick={() => handleMethodClick("paypal")}
                />
                <img
                  className={`payment-method-img ml-4 ${
                    selectedMethod === "cash" ? "selected" : ""
                  }`}
                  src="cash1.png"
                  style={{ width: "190px", height: "60px" }}
                  alt="Cash"
                  onClick={() => handleMethodClick("cash")}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {/* Card Number Input */}
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number:</label>
                <input type="text" id="cardNumber" className="form-control" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {/* Expiration Date Input */}
              <div className="form-group">
                <label htmlFor="expirationDate">Expiration Date:</label>
                <input
                  type="text"
                  id="expirationDate"
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* CVV Input */}
              <div className="form-group">
                <label htmlFor="cvv">CVV:</label>
                <input type="text" id="cvv" className="form-control" />
              </div>
            </div>
            <div className="row mt-4">
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
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <Link to="/booking">
                  <button
                    type="button"
                    style={{ width: "240px", height: "50px" }}
                    className="returnn">
                    Back
                  </button>
                </Link>
              </div>

              <div className="col-md-6">
                {/* <Link to="/qrbook"> */}
                <button
                  onClick={() => reservationHandler()}
                  type="button"
                  className="returnn1 float-right"
                  style={{ width: "10px", height: "50px" }}>
                  Pay
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
