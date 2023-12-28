import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../css/slider.css";
import SearchBar from  "../homepage/searchbar"
import Welcome from '../homepage/welcome';
const MySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
      };

      
  
    return (
        <div  className="slider-container ">
           <div className="slider-overlay"></div>
           <div className="slider-overlayy"></div>
              <div className="slider-text ">
        <p className="slider-title">Welcome to Orange Bay</p>
        <p className="slider-description">Orange Bay is a stunning natural bay in the ecologically protected island of Giftun</p>
      </div>
      <Slider {...settings}>
        <div>
          <img src="./1.jpg" alt="Slider Image 1" className="slider-image"  />
        </div>
        <div>
          <img src="./3.jpg" alt="Slider Image 2" className="slider-image"  />
        </div>
        <div>
          <img src="./2.jpg" alt="Slider Image 3" className="slider-image"  />
        </div>
        {/* Add more <div> elements for additional slides */}
        
      </Slider>
      </div>
     
    );
  };
  export default MySlider 