import React from 'react';
import Searchbar from '../homepage/searchbar'
import "../../css/reservation/first.css";
import Navbook from '../reservation/navbook';

const Reservation = () => {
    return (
      <div>
          <div >
            <img src="3.jpg" alt="Image" className="img-fluid reservation-image" />
          </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 reservation-search ">
            <Searchbar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <p className="classic-program">Classic Program</p>
          </div>
          <div className="col-md-6 text-right">
            <div className="ratings">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4">
            <img src="wishlist.png" alt="Image 1" className="img-fluid" />
          </div>
          <div className="col-md-4 ">
            <img src="watch.png" alt="Image 2" className="img-fluid" />
          </div>
          <div className="col-md-3  ">
            <img src="fullday.png" alt="Image 3" className="img-fluid" />
          </div>
       
        </div>
        <div className="row">
          <div className="col-md-3 ml-4 image-caption">
            <img src="adults.png" alt="Adults" className="img-fluid" />
            <p className="caption">Adults <br /> <strong className='text-dark'>750EGP </strong></p>
          </div>
          <div className="col-md-3 mr-5  image-caption">
            <img src="children.png" alt="Children" className="img-fluid" />
            <p className="caption text-dark">Children aged (4-12) <strong className='text-dark'> 450EGP </strong>  </p>
          </div>
          <div className="col-md-2 mr-5 image-caption">
            <img src="baby.png" alt="Baby" className="img-fluid" />
            <p className="caption">Children under 4 <strong className='text-dark'> FREE </strong></p>
          </div>
        </div>
        </div>
        <Navbook/>
      </div>
    );
  };
  
  export default Reservation;