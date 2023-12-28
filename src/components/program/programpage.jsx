import React, { useContext, useEffect, useState } from "react";
import "../../css/related.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { instance } from "../../api/axios";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
export default function Programpage() {
  const auth = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  useEffect(() => {
    instance
      .get("Programs", {
        params: {
          userId: auth?.userTypeId,
        },
      })
      .then((res) => {
        console.log(res);
        setPrograms(res?.data?.data);
      }).catch((err)=>{
        console.log(err)
      })
  }, []);
  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title mt-5 ">Programms</h1>
      </div>
      <div className="reservation-banner mb-4">
        <div className="slider-overrlay-res"></div>
        <img src="3.jpg" className="bbb" alt="" />
      </div>
      {programs.map((program) => {
        return (
          <div className="container mt-4">
            <div className=" row ">
              <div className="col-md-4">
                <div
                  className="card border-0"
                  style={{ width: "344px", height: "516px" }}>
                  <div className="top-left">
                    <p className="start-price start">
                      Start from <br />
                      <strong className="start-price"> {program?.pricePerChild} EGP </strong>
                    </p>
                  </div>
                  {program?.isFavourite &&
                     <div className="top-right">
                      <div className="circle">
                        <i className="fa-sharp fa-solid fa-heart fa-fade mb-1"></i>
                      </div>
                    </div> 
                  }
                  <img src={program?.photos?.[0]} alt="Image 1" className="card-img-top" />
                  <Link to={`/programs/${program?.id}`}>
                    <div className="card-body">
                      <h5 className="text-dark">{program?.name}</h5>
                      <p className="card-text text-primary">
                        {program?.pricePerAdult} EGP Per Person
                      </p>
                      <p className="card-text text-primary ">
                        {program?.pricePerChild} EGP Per Children
                      </p>
                      <Rating emptySymbol={<IoIosStarOutline  />} fullSymbol={<IoIosStar color="#F47732" />} initialRating={program?.rate} readonly />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
