import React from 'react';
import "../../css/footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="padding_4x mt-5">
      <div class="flex">
        <section class="flex-content padding_1x ml-3 mt-4 ">
          <h5 className="text-white">About Us</h5>
          <a href="/contactus">Contact Us</a>
          <a href="/gallery">gallery</a>
          <a href="/videos">videos</a>
        </section>
        <section class="flex-content padding_1x mr-5 mt-4 ">
          <h5 className="text-white">The Red Sea Weather</h5>
          <div class="image-link-container">
            <img src="wether.png" className="mb-2" alt="" />
            <a href="#">
              Air Temperature <p>21&deg;</p>{" "}
            </a>
          </div>
          <div class="image-link-container mb-0">
            <img src="water.png" className="mb-2" alt="" />
            <a href="#">
              Air Temperature <p>23&deg;</p>{" "}
            </a>
          </div>
        </section>
        <section class="flex-content padding_1x mt-4 ">
          <h5 className="text-white">Information</h5>
          <a href="/contactus">FAQs</a>
          <a href="/aboutus">Vision</a>
          <a href="/aboutus">Goals</a>
        </section>
        <section class="flex-content padding_1x mt-4 ">
          <h5 className="text-white">Subscribe to our newsletter</h5>

          <fieldset class="fixed_flex inn mt-5 mr-4">
            <input
              type="email"
              name="newsletter"
              placeholder="Your Email Address"
            />
            <button class="btn btn_2">send</button>
          </fieldset>
          <h5 className=" mt-5 ml-3 text-white "> Follow us </h5>
          <div className="social-icons mr-5">
          <a href="https://www.facebook.com/orange.bay.hurghada/?locale=ar_AR" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook fa-lg mr-2"></i>
      </a>
      <a href="https://www.instagram.com/orangebayhurghada/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram fa-lg mr-2"></i>
      </a>
      <a href="https://twitter.com/kemetland_/status/1276653702628225024?lang=ar" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-twitter fa-lg mr-5"></i>
      </a>
          </div>
        </section>
      </div>
      <div class="flex">
        <section class="flex-content last-words ml-4 ">
          <p>Orange Bay.©2023 - All rights reserved </p>
        </section>
        <section class="flex-content last-words mr-4 ">
          <p>Created By ITD </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
