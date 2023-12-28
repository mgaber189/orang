import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../css/reservation/overview.css";
import { FaCheck } from 'react-icons/fa';

const Overview = () => {
  const [showArrows, setShowArrows] = useState(true);
  const PrevArrow = (props) => (
    <button {...props} className="slick-arrow slick-prev" onClick={props.onClick}>
  <i class="fa-sharp fa-solid fa-arrow-left"></i>
    </button>
  );

  const NextArrow = (props) => (
    <button {...props} className="slick-arrow slick-next" onClick={props.onClick}>
          <i class="fa-sharp fa-solid fa-arrow-right"></i>
    </button>
  );
  const sliderRef = React.useRef(null);
  const [currentSlide, setCurrentSlide] = React.useState(0); // Define currentSlide
  const slideCount = 5; // Define slideCount

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
    setCurrentSlide(index); // Update currentSlide
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: (i) => <CustomPagination goToSlide={goToSlide} currentSlide={i} slideCount={5} />,
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
          className={index === currentSlide ? 'active' : ''}
          onClick={() => goToSlide(index)}
        >
         <div className={`circle ${index === currentSlide ? 'active' : ''}`}>
          {index + 1}
        </div>
        </li>
      ))}
    </ul>
  );
  
  return (
    <div>
      <Slider {...settings} ref={sliderRef} >
        <div>
          <img src="Mask2.png" className='overimg' alt="Image 1" />
        </div>
        <div>
          <img src="Mask3.png" className='overimg' alt="Image 2" />
        </div>
        <div>
          <img src="Mask.png" className='overimg' alt="Image 3" />
        </div>
        <div>
          <img src="img.png" className='overimg' alt="Image 4" />
        </div>
        <div>
          <img src="eve.png" className='overimg' alt="Image 5" />
        </div>
      </Slider>
      <br />
        <div className="slider-pagination ">
      <CustomPagination goToSlide={goToSlide} currentSlide={currentSlide} slideCount={slideCount} />
    </div>
      <div className="box-container">
        <div className="line">
          <FaCheck className="check-icon" />
          Boat cruise with a snorkeling stop
        </div>
        <div className="line">
          <FaCheck className="check-icon" />
          Rest and relax on one of the most amazed islands on Giftun
        </div>
        <div className="line">
          <FaCheck className="check-icon" />
          National Park Buffet lunch in Dolphin restaurant
        </div>
      </div>
    </div>
  );
};

export default Overview;
