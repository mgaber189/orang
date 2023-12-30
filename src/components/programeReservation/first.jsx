import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../homepage/searchbar";
import "../../css/programeReservation/first.css";
import Navbook from "./navbook";
import { Link, useParams } from "react-router-dom";
import { instance } from "../../api/axios";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { BookContext } from "../context/BookContext";

const Reservation = () => {
  const { id } = useParams();
  const [program, setProgram] = useState();
  const book = useContext(BookContext)
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
  return (
    <div>
      {/* <div className="slider-text mt-5">
        <p className="slider-title ">Classic Program</p>
      </div>
      <div className="reservation-banner">
      <div className="slider-overrlay-res" ></div>
      <img src="3.jpg" className='bbb' alt="" />
      </div> */}
      <div className="container">
        <div className="row">
          {/* <div className="col-md-12 reservation-search ">
            <Searchbar />
          </div> */}
        </div>
        <div className="row mt-2">
          <div className="col-md-7 ">
            <p className="classic-program ">{program?.name}</p>
          </div>
          {/* <div className="col-md-2 ml-5 mt-1">
            <Rating emptySymbol={<IoIosStarOutline  />} fullSymbol={<IoIosStar color="#F47732" />} initialRating={program?.} readonly />
          </div> */}

          <div className="col-md-1  wish-watch">
            <div className="circle">
              <i className="fa-sharp fa-solid fa-heart "></i>
            </div>{" "}
            <span className="caption">wishlist</span>{" "}
          </div>
          <div className="col-md-1 wish-watch">
            <div className="circle">
              <Link to="/videos">
                <i class="fa-solid fa-play"></i>{" "}
              </Link>{" "}
            </div>{" "}
            <span className="caption"> Video</span>{" "}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3  image-caption">
            {/* <img src="adults.png" alt="Adults" className="img-fluid" /> */}
            <p className="caption">
              Adults <br /> <strong className="text-dark">{program?.pricePerAdult}USD </strong>
            </p>
          </div>
          <div className="col-md-3 mr-5  image-caption">
            {/* <img src="children.png" alt="Children" className="img-fluid" /> */}
            <p className="caption text-dark">
              Children aged (4-12){" "}
              <strong className="text-dark"> {program?.pricePerChild}USD </strong>{" "}
            </p>
          </div>
          <div className="col-md-5  image-caption">
            {/* <img src="baby.png" alt="Baby" className="img-fluid" /> */}
            <p className="caption">
              Children under 4 <br />{" "}
              <strong className="text-dark"> FREE </strong>
            </p>
          </div>
        </div>
      </div>
      <Navbook />
    </div>
  );
};

export default Reservation;
