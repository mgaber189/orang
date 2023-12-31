import React, { useContext, useEffect, useState } from "react";
import "../../css/related.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Programpage from "../program/programpage";
import { AuthContext } from "../context/AuthContext";
import { instance } from "../../api/axios";
import Rating from "react-rating";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const RelatedTripsComponent = () => {
  const [showArrows, setShowArrows] = useState(true);
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
        setPrograms(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function toggleFavorite(event) {
    const wishlistIcon = event.target;
    wishlistIcon.classList.toggle("favorite");
  }
  const PrevArrow = (props) => (
    <button
      {...props}
      className="slick-arrow slick-prev"
      onClick={props.onClick}>
      <i class="fa-sharp fa-solid fa-arrow-left"></i>
    </button>
  );

  const NextArrow = (props) => (
    <button
      {...props}
      className="slick-arrow slick-next"
      onClick={props.onClick}>
      <i class="fa-sharp fa-solid fa-arrow-right"></i>
    </button>
  );
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: () => {
      setShowArrows(false);
    },
    afterChange: () => {
      setShowArrows(true);
    },
  };
  return (
    <div className="container">
      <h1 className="text-center mb-4 "> Programs </h1>
      {/* <Slider {...sliderSettings}> */}
      <div className="d-flex justify-content-between flex-wrap">
        {programs?.slice(0, 4).map((program,index) => {
          return (
            <>
            <div key={index} className="col-md-4">
              <div
                className="card border-0"
                style={{ width: "344px", height: "516px" }}>
                <div className="top-left">
                  <p className="start-price start">
                    Start from <br />
                    <strong className="start-price">
                      {" "}
                      {program?.pricePerChild} USD{" "}
                    </strong>
                  </p>
                </div>
                {program?.isFavourite && (
                  <div className="top-right">
                    <div className="circle">
                      <i className="fa-sharp fa-solid fa-heart fa-fade mb-1"></i>
                    </div>
                  </div>
                )}
                <img
                  src={program?.photos?.[0]}
                  alt="Image 1"
                  className="card-img-top"
                />
                <Link to={`/programs/${program?.id}`}>
                  <div className="card-body">
                    <h5 className="text-dark">{program?.name}</h5>
                    <p className="card-text text-primary">
                      {program?.pricePerAdult} USD Per Person
                    </p>
                    <p className="card-text text-primary ">
                      {program?.pricePerChild} USD Per Children
                    </p>
                    <Rating
                      emptySymbol={<IoIosStarOutline />}
                      fullSymbol={<IoIosStar color="#F47732" />}
                      initialRating={program?.rate}
                      readonly
                    />
                  </div>
                </Link>
              </div>
            </div>
            </>
            
          );
        })}
      </div>
      {/* </Slider> */}
      <div className="row justify-content-center">
        <Link to="./program" className="text-center">
          <button className="btn-orange mb-5">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default RelatedTripsComponent;
