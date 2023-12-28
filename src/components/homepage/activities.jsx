import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

export default function Activities() {
  const [showArrows, setShowArrows] = useState(true);
  function toggleFavorite(event) {
    const wishlistIcon = event.target;
    wishlistIcon.classList.toggle('favorite');
  }
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
    <div className='container'>

      <h2 className='text-center mt-4 mb-5'>Best Offers</h2>
    <Slider  {...sliderSettings}>
      <div className="col-md-4">
        <div className="card border-0" style={{ width: '344px', height: '516px' }}>
          <div className="top-left">
            <p className="start-price start">
              Start from <br />
              <strong className="start-price"> 850 EGP </strong>
            </p>
          </div>
          <div className="top-right">
            <div className="circle">
              <i className="fa-sharp fa-solid fa-heart fa-fade"></i>
            </div>
          </div>
          <img src="Mask.png" alt="Image 1" className="card-img-top" />
          <div className="card-body">
            <h5>Classic program</h5>
            <p className="card-text text-primary">1000 EGP Per Person</p>
            <p className="card-text text-primary">750 EGP Per Children</p>
            <div className="rating">
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card border-0" style={{ width: '344px', height: '516px' }}>
          <div className="top-left">
            <p className="start-price start">
              Start from <br />
              <strong className="start-price"> 850 EGP </strong>
            </p>
          </div>
          <div className="top-right">
            <div className="circle">
              <i className="fa-sharp fa-solid fa-heart fa-fade "></i>
            </div>
          </div>
          <img src="Mask2.png" alt="Image 2" className="card-img-top" />
          <div className="card-body">
            <h5>Go island program</h5>
            <p className="card-text text-primary">1000 EGP Per Person</p>
            <p className="card-text text-primary">750 EGP Per Children</p>
            <div className="rating">
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card border-0" style={{ width: '344px', height: '516px' }}>
          <div className="top-left">
            <p className="start-price start">
              Start from <br />
              <strong className="start-price"> 850 EGP </strong>
            </p>
          </div>
          <div className="top-right">
            <div className="circle">
              <i className="fa-sharp fa-solid fa-heart fa-fade"></i>
            </div>
          </div>
          <img src="Mask3.png" alt="Image 3" className="card-img-top" width="344" height="279" />
          <div className="card-body">
            <h5>Photo session program</h5>
            <p className="card-text text-primary">500 EGP Per Person</p>
            <p className="card-text text-primary">250 EGP Per Person</p>
            <div className="rating">
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card border-0" style={{ width: '344px', height: '516px' }}>
          <div className="top-left">
            <p className="start-price start">
              Start from <br />
              <strong className="start-price"> 850 EGP </strong>
            </p>
          </div>
          <div className="top-right">
            <div className="circle">
              <i className="fa-sharp fa-solid fa-heart fa-fade"></i>
            </div>
          </div>
          <img src="Mask3.png" alt="Image 3" className="card-img-top" width="344" height="279" />
          <div className="card-body">
            <h5>Photo session program</h5>
            <p className="card-text text-primary">500 EGP Per Person</p>
            <p className="card-text text-primary">250 EGP Per Person</p>
            <div className="rating">
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
              <span className="orange-star"></span>
            </div>
          </div>
        </div>
      </div>



    </Slider>
    <div className="row justify-content-center">
    <div className="text-center">
      <button className="btn-orange mb-5">See All</button>
    </div>
  </div>
  </div>
  );
}
