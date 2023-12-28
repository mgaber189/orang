import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/programeReservation/overview.css";
import { FaCheck } from "react-icons/fa";
import { useParams } from "react-router";
import { instance } from "../../api/axios";
import { toast } from "react-toastify";

const Overview = () => {
  const { id } = useParams();
  const [showArrows, setShowArrows] = useState(true);
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slideCount = 5;
  const [program, setProgram] = useState();
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
  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
    setCurrentSlide(index);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Remove the next and previous arrows
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    customPaging: (i) => (
      <CustomPagination goToSlide={goToSlide} currentSlide={i} slideCount={5} />
    ),
    beforeChange: () => {
      setShowArrows(false);
    },
    afterChange: () => {
      setShowArrows(true);
    },
  };

  const CustomPagination = ({ currentSlide, slideCount, goToSlide }) => (
    <ul className="custom-dots">
      {Array.from({ length: slideCount }).map((_, index) => (
        <li
          key={index}
          className={index === currentSlide ? "active" : ""}
          onClick={() => goToSlide(index)}>
          <div className={`circle ${index === currentSlide ? "active" : ""}`}>
            {index + 1}
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div>
      <Slider {...settings} ref={sliderRef}>
        {program?.photos?.map((pro) => {
          return (
            <div>
              <img src={pro} className="overimg" alt="Image 1" />
            </div>
          );
        })}
      </Slider>
      <br />
      <div className="slider-pagination ">
        <CustomPagination
          goToSlide={goToSlide}
          currentSlide={currentSlide}
          slideCount={slideCount}
        />
      </div>
      <div className="box-container">
        {program?.notes.map((note,index)=>{

          <div key={index} className="line">
            <FaCheck className="check-icon" />
            {note}
          </div>
        })}
      </div>
      <div className="float-left mt-5">
        {" "}
        <p>{program?.description}</p>{" "}
      </div>
    </div>
  );
};

export default Overview;
