import React from "react";
import SearchBar from "../homepage/searchbar";
import "../../css/dining/firstdining.css";
import Images from "../gallery/images";

export default function First_gallery() {
  return (
    <div>
      {/* <div className="slider-overrlay" ></div> */}
      {/* <div className="slider-overlayy"></div> */}
      <div className="slider-text mt-5">
        <h1 className="slider-title">Gallery</h1>
        <p className="slider-description">
          Orange Bay hosts a variety of Images and bars scattered around the
          island
        </p>
      </div>
      <div className="reservation-banner mb-4">
        <div className="slider-overrlay-res"></div>
        <img src="dining.png" className="bbb " alt="" />
        {/* <SearchBar/> */}
      </div>
      <Images />
    </div>
  );
}
