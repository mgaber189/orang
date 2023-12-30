import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../../css/contact/contact.css";
import { instance } from '../../api/axios';
import { toast } from 'react-toastify';
const ContactUs = () => {
  const handleSubmit=(e)=>{
    e.preventDefault();
    instance.post("ContactUs",{
      fullName:e.target[0].value,
      email:e.target[2].value,
      phone:e.target[3].value,
      subject:e.target[4].value,
      message:e.target[5].value
    }).then((res)=>{
      toast.success("Message is sended ")
      e.target.reset()
    }).catch((err)=>{
      toast.warning("There is some thing went wrong")
    })
  }
  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title mt-5">Contact Us</h1>
      </div>
      <div className="reservation-banner mb-4">
      <div className="slider-overrlay-res" ></div>
      <img src="dining.png" className='bbb' alt="" />
      </div>
    <div className="contact-us">
      <div className="top-image text-center">
        {/* Replace 'topImage.jpg' with the URL of your top image */}
        <img src="contact.png" alt="Contact Us" />
      </div>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Contact Us</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your email" />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter your Phone" />
              </Form.Group>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" placeholder="Enter the subject" />
              </Form.Group>

              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
              </Form.Group>

              <Button variant="primary" type="submit" className="btn-block">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </div>
  );
};

export default ContactUs;
