import React, { useContext, useEffect, useState } from "react";
import "../../css/reservation/reservation.css";
import { instance } from "../../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Reservations = () => {
  const [view, setView] = useState(1);
  const [reservation, setReservation] = useState([]);
  const auth = useContext(AuthContext);
  const reservationCancel=(id)=>{
    instance.delete(`Reservation/${id}`).then((res)=>{
      toast.success(res.message)
      getReservationHandler();
    }).catch((err)=>{
      console.log(err)
      toast.warning(err.response.data.message)
    })
  }
  const getReservationHandler = () => {
    instance
      .get("Reservation", {
        params: {
          userId:auth?.id,
          // userId: 1,
          reservationStatus: view,
        },
      })
      .then((res) => {
        setReservation(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getReservationHandler();
  }, [view]);
  const handleViewChange = (selectedView) => {
    setView(selectedView);
  };
  console.log(reservation)
  const renderReservations = () => {
    if (view === 1) {
      return (
        <div className="container ">
          <p className="slider-title text-center"> Upcoming Reservations </p>
          {reservation.map((reserv, index) => (
            <div key={index} className="card reserve-card col-md-12 mb-4">
              <div className="ress">
                <div className=" row">
                  <div className="col-md-4 mb-3 mt-3">
                    <img src="3.jpg" width={381} alt="" />
                  </div>
                  <div className="col-md-7 mt-5">
                    <h5 className="card-title mb-3">{reserv?.program?.name}</h5>
                    <p className="card-text">
                      <strong className="text-danger">
                        Deadline of Cancellation:
                      </strong>
                      <strong className="float-right">
                        {" "}
                        {
                          new Date(reserv.cancellationDeadline)
                            .toISOString()
                            .split("T")[0]
                        }
                      </strong>
                      <br /> <br />
                      <strong className="text-secondary">Adults x</strong>{" "}
                      {reserv?.program?.numberOfAdults}
                      <br /> <br />
                      <strong className="text-secondary">
                        Children x{" "}
                      </strong>{" "}
                      {reserv?.program?.numberOfChild}
                      <br /> <br />
                      <strong className="text-secondary">Total:</strong>{" "}
                      <strong className="float-right">
                        {reserv?.totalServicesPrice}{" "}
                      </strong>
                    </p>
                  </div>
                  <div className=" ress mb-3 mt-3" role="group">
                    <button className=" btn-reservation text-white">
                      Edit Trip
                    </button>
                    <button className="btn-reservation text-white ml-5">
                      Print
                    </button>
                    <button onClick={()=>{reservationCancel(reserv?.reservationId)}} className="btn-cancelation  text-white float-right">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (view === 0) {
      return (
        <div className="container ">
          <p className="slider-title text-center"> Upcoming Reservations </p>

          {reservation.map((reserv, index) => (
            <div key={index} className="card reserve-card col-md-12 mb-4">
              <div className="ress">
                <div className=" row">
                  <div className="col-md-4 mb-3 mt-3">
                    <img src="3.jpg" width={381} alt="" />
                  </div>
                  <div className="col-md-7 mt-5">
                    <h5 className="card-title mb-3">{reserv?.program?.name}</h5>
                    <p className="card-text">
                      <strong className="text-danger">
                        Deadline of Cancellation:
                      </strong>
                      <strong className="float-right">
                        {" "}
                        {
                          new Date(reserv.cancellationDeadline)
                            .toISOString()
                            .split("T")[0]
                        }
                      </strong>
                      <br /> <br />
                      <strong className="text-secondary">Adults x</strong>{" "}
                      {reserv?.program?.numberOfAdults}
                      <br /> <br />
                      <strong className="text-secondary">
                        Children x{" "}
                      </strong>{" "}
                      {reserv?.program?.numberOfChild}
                      <br /> <br />
                      <strong className="text-secondary">Total:</strong>{" "}
                      <strong className="float-right">
                        {reserv?.totalServicesPrice}{" "}
                      </strong>
                    </p>
                  </div>
                  <div className=" ress mb-3 mt-3" role="group">
                    <button className=" btn-reservation text-white">
                      Edit Trip
                    </button>
                    <button className="btn-reservation text-white ml-5">
                      Print
                    </button>
                    <button onClick={()=>{reservationCancel(reserv?.reservationId)}} className="btn-cancelation  text-white float-right">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      {/* <div className="slider-overlayy"></div> */}
      <div className="slider-text">
        <h1 className="slider-title mt-5">My Reservation</h1>
      </div>
      <div className="reservation-banner">
        <div className="slider-overrlay-res"></div>
        <img src="2.jpg" className="bbb" alt="" />
      </div>
      <div className="container  mt-4">
        <div className=" text-center" role="group">
          <button
            className={`btn btn-secondary reserved-btn upcoming-btn mx-2  ${
              view === "upcoming" ? "active" : ""
            }`}
            onClick={() => handleViewChange(1)}>
            Upcoming
          </button>
          <button
            className={`btn btn-primary reserved-btn mx-2 ${
              view === "past" ? "active" : ""
            }`}
            onClick={() => handleViewChange(0)}>
            Past
          </button>
        </div>
        <br />
        <br />
        {renderReservations()}
      </div>
    </div>
  );
};

export default Reservations;
