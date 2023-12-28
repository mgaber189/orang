import React, { useState } from 'react';
import { BsPeople, BsCalendar, BsGlobe } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import "../../css/membership/membership.css";
import { Card } from 'react-bootstrap';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageGallery = () => {
    const [membershipType, setMembershipType] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [SelectedType, setSelectedType] = useState('');
 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic here to submit the form data
    };
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      membershipType,
      email,
      fullName,
      phoneNumber,
      occupation,
      introduction,
    });
    // Reset form fields after submission
    setMembershipType('');
    setEmail('');
    setFullName('');
    setPhoneNumber('');
    setOccupation('');
    setIntroduction('');
  };

  return (
    <div>
          <div className="slider-text mt-5">
        <p className="slider-title">Membership</p>
        <p className="slider-description">We welcome you to join the Orange Bay community and to discover the wide ranging benefits 
they offer.</p>
      </div>
      <div className="reservation-banner">
      <div className="slider-overrlay-res" ></div>
      <img src="3.jpg" className='bbb' alt="" />
      
      </div>
      <section className='container dinning-sec mb-5'>
  <p class="section-title text-black mt-4">Membership</p>
  <p class="section-description">
  We welcome you to join the Orange Bay community and to discover the wide ranging benefits they offer.
You can find various membership options matching your specifications, wether you are single, with the family or a business we can offer you a suitable membership program.
  </p>


</section>
    <div className="image-gallery">
      <div className="filter-bar">
        {/* Filter buttons */}
      </div>

      <div className="image-grid">
        {/* Image Card 1 */}
        <Card className="image-card">
      <Slider {...settings}>
        <div>
          <Card.Img variant="top" src="yacht1.jpg" className="card-member" />
        </div>
        <div>
          <Card.Img variant="top" src="yacht1.jpg" className="card-member" />
        </div>
        <div>
          <Card.Img variant="top" src="yacht1.jpg" className="card-member" />
        </div>
        {/* Add more images as needed */}
      </Slider>
      <Card.Body>
        <Card.Title>Yacht Club</Card.Title>
        <Card.Text>
          This membership is for the owners of aqua centres and diving schools. With this membership, you will have
          access to free entry on the island and 10 vouchers for free entry for family and friends.
        </Card.Text>
      </Card.Body>
    </Card>

        {/* Image Card 2 */}
        <Card className="image-card">
          <Card.Img variant="top" src="Dolphin.jpg" className='card-member' />
          <Card.Body>
            <Card.Title>Dolphin Pass</Card.Title>
            <Card.Text>
            This membership are for those who own a private boat. With this membership you will have access to free entry for the island for owner only, a 50% discount on entry for friends and family, 25% discount on food and beverage, access to the Yacht Club on the island, 10 vouchers for free entry ( 2 per day max ) and a 250 LE voucher for Yacht Club gift shop.
            
            </Card.Text>
           
          </Card.Body>
        </Card>

        {/* Image Card 3 */}
        <Card className="image-card">
          <Card.Img variant="top" src="mermaid.jpg" className='card-member' />
          <Card.Body>
            <Card.Title>Mermaid Pass</Card.Title>
            <Card.Text>
            This membership are for the woman. With this membership you will have access to free entry on the island, free entry for family once a month, a 50% discount on shuttle boat , 50% discount on events depending availability (vouchers non applicable), 25% discount on food and beverage, 25%  discount on all island services, and 5 vouchers for free entry for friends ( 1 per day max )
            </Card.Text>
          </Card.Body>
        </Card>
         {/* Image Card 4 */}
        <Card className="image-card">
          <Card.Img variant="top" src="shark.jpg" className='card-member' />
          <Card.Body>
            <Card.Title>Shark Pass</Card.Title>
            <Card.Text>
            This membership are for those who own a private boat. With this membership you will have access to free entry for the island for owner only, a 50% discount on entry for friends and family, 25% discount on food and beverage, access to the Yacht Club on the island, 10 vouchers for free entry ( 2 per day max ) and a 250 LE voucher for Yacht Club gift shop.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
    <div className="membership-container mt-4">
      <h2>Membership Registration</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="membershipType" className="form-label">Choose Membership Type:</label>
          <select
            id="membershipType"
            className="form-control form-select"
            value={membershipType}
            onChange={(e) => setMembershipType(e.target.value)}
            required
          >
            <option value="">Select Membership Type</option>
            <option value="mermaid">Mermaid Pass</option>
            <option value="whale">Whale Pass</option>
            <option value="shark">Shark Pass</option>
            <option value="yacht">Yacht Club</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address:</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="fullName" className="form-label">Full Name:</label>
            <input
              type="text"
              id="fullName"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="occupation" className="form-label">Occupation:</label>
          <textarea
            type="text"
            id="occupation"
            className="form-control"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="introduction" className="form-label">Introduction:</label>
          <textarea
            id="introduction"
            className="form-control textarea-control"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            required
          />
        </div>
<div className='text-center'>
        <button type="submit" className="btn btn-primary ">Register</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default ImageGallery;
