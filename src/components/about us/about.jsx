import React from 'react';
import "../../css/about/about.css";
import { Link } from 'react-router-dom';
import img from "./facilities.PNG"
const AboutUsPage = () => {
  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title  mt-5">About Us</h1>
      </div>
      <div className="reservation-banner mb-4">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb" alt="" />
      </div>
      <div className="container">
        <div className="row align-items-center">
          {/* <img src={orangeBayImage} alt="Orange Bay" className="orange-bay-image" /> */}
          <div className="col-md-6 ">
            <p className='fs-5'>
              Orange Bay is situated on an ecologically protected island, making
              it a jewel of the Red Sea.
            </p>
            <p className='fs-5'>
              We invite you to enjoy these unspoiled white sandy beaches and
              crystal clear turquoise waters by lounging in one of our bean bag
              chairs, sipping on a cocktail or to enjoy a scrumptious meal
              crafted by our talented chefs as you take in the beauty that is
              the Red Sea.
            </p>
          </div> 
          <div className='col-md-6 '>
          {/* <Link target={'_blank'} to="https://www.google.com/maps/place/Orange+Bay/@27.2083739,38.5407649,7z/data=!4m10!1m2!2m1!1sorangebay!3m6!1s0x145286b2fefa8723:0x1bc68880daea217e!8m2!3d27.2083739!4d33.9265071!15sCgpvcmFuZ2UgYmF5WgwiCm9yYW5nZSBiYXmSARJ0b3VyaXN0X2F0dHJhY3Rpb27gAQA!16s%2Fg%2F1q6jbv79m?entry=ttu">
            <img src="3.jpg" alt="Orange Bay Map" className="map-image" />
          </Link> */}
<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3633503.395360404!2d38.5407649!3d27.2083739!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145286b2fefa8723%3A0x1bc68880daea217e!2sOrange%20Bay!5e0!3m2!1sar!2seg!4v1689692909194!5m2!1sar!2seg" width="600" height="250"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div className='mt-3 text-center'>
          <h2>Our Facilities</h2>
        </div>
        <div className='mt-3 '>
          <img src={img} className='facilite' alt="" />
        </div>
        {/* Add more content here if needed */}
      </div>
    </div>
  );
};

export default AboutUsPage;
