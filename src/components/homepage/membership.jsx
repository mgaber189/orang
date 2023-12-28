import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import "../../css/membership.css";
import { Link } from 'react-router-dom';


export default function Membership() {
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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: () => {
          setShowArrows(false);
        },
        afterChange: () => {
          setShowArrows(true);
        },
      };

    
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="text-left">
              <h2>Membership</h2>
              <p className="section-description text-dark">Join our community and discover the benefits offered by our large variety of membership cards.</p>
              <div className='row'>
              <ul className="marks row">
  <div className="col-md-6">
    <li className="col-md-4">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>Whale</span>
    </li>
    <li className="col-md-4">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>Shark</span>
    </li>
    <li className="col-md-4">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>Mermaid</span>
    </li>
  </div>
  <div className="col-md-6">
    <li className="col-md-4">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>Mantaray</span>
    </li>
    <li className="col-md-4">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>Dolphin</span>
    </li>
    <li className="col-md-4 mb-5">
      <FontAwesomeIcon icon={faCheckCircle} className="orange-checkmark" />
      <span>YachtClub</span>
    </li>
  </div>
</ul>
<Link to='/membership'>
<button className="membership-button">Membership Cards</button>
</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5 ">
            <Slider {...settings}>
              <div>
                <img src="whale.jpg" className='ych' alt="" />
              </div>
              <div>
                <img src="whale2.jpg" className='ych' alt="" />
              </div>
              <div>
                <img src="yacht1.jpg" className='ych' alt="" />
              </div>
              <div>
                <img src="shark.jpg" className='ych' alt="" />
              </div>
              <div>
                <img src="Dolphin.jpg" className='ych' alt="" />
              </div>
              <div>
                <img src="Mermaid.jpg" className='ych' alt="" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
