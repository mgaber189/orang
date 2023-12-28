import React from "react";
import SearchBar from "../homepage/searchbar";
import "../../css/dining/firstdining.css";
import ImageGallery from "../dining/resturants";

export default function FirstDining() {
  return (
    <div>
      {/* <div className="slider-overrlay" ></div> */}
      {/* <div className="slider-overlayy"></div> */}
      <div className="slider-text mt-5">
        <p className="slider-title">Dining</p>
        <p className="slider-description">
          Orange Bay hosts a variety of restaurants and bars scattered around
          the island
        </p>
      </div>
      <div className="reservation-banner">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb" alt="" />
        <SearchBar />
      </div>
      <section className="container dinning-sec mb-5">
        <h2 class="section-title text-dark">Dining</h2>
        <p class="section-description">
          Orange Bay hosts a variety of restaurants and bars scattered around
          the island to cater to all our guests needs; from private dining,
          family gatherings to party <br /> <br /> and events. We have thought
          of everything for you to have the perfect experience. Enjoy lunch,
          dinner, cocktails, business meetings, or parties at any of our
          locations. <br /> <br /> Please select a location to view the
          facilities that are available and that suit your needs.
        </p>
        <div className="rectangles-container">
          <div className="rectangle left-rectangle">
            <img src="Dining-Delicious.png" alt="Romantic Ambience" />
            <span>Romantic Ambience</span>
          </div>
          <div className="rectangle middle-rectangle">
            <img src="Dining-Delicious.png" alt="Delicious Food" />
            <span>Delicious Food</span>
          </div>
          <div className="rectangle right-rectangle">
            <img src="Dining-Staff.png" alt="Friendly Staff" />
            <span>Friendly Staff</span>
          </div>
        </div>
      </section>
      <ImageGallery />
    </div>
  );
}
