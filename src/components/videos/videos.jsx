import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import "../../css/videos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { instance } from "../../api/axios";
const Videos = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activePage, setActivePage] = useState(1);
  const videosPerPage = 36;
  const [videos, setVideos] = useState([]);
  const getVideosHandler = () => {
    instance
      .get("Gallery/Videos")
      .then((res) => {
        setVideos(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getVideosHandler();
  }, []);
  console.log(videos);
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const filteredVideos =
    activeFilter === "All"
      ? videos
      : videos.filter((video) => video.type === activeFilter);

  // Pagination logic
  const totalItemsCount = filteredVideos.length;
  const totalPages = Math.ceil(totalItemsCount / videosPerPage);
  const startIndex = (activePage - 1) * videosPerPage;
  const endIndex = startIndex + videosPerPage;
  const visibleVideos = filteredVideos.slice(startIndex, endIndex);

  return (
    <div>
      <div className="slider-text  ">
        <h1 className="slider-title mt-5 ">Videos</h1>
        <p className="slider-description">
          Orange Bay hosts a variety of Videos and bars scattered around the
          island
        </p>
      </div>
      <div className="reservation-banner mb-4">
        <div className="slider-overrlay-res"></div>
        <img src="3.jpg" className="bbb" alt="" />
      </div>
      <div className="video-gallery">
        {/* <div className="filter-bar">
          <button
            className={`filter-button ${
              activeFilter === "All" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("All")}>
            All
          </button>
          <button
            className={`filter-button ${
              activeFilter === "panoramic" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("panoramic")}>
            Panoramic view
          </button>
          <button
            className={`filter-button ${
              activeFilter === "relax" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("relax")}>
            Relax
          </button>
          <button
            className={`filter-button ${
              activeFilter === "joy" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("joy")}>
            Joy & fun
          </button>
          <button
            className={`filter-button ${
              activeFilter === "dine" ? "active" : ""
            }`}
            onClick={() => handleFilterClick("dine")}>
            Dine
          </button>
        </div> */}
        <div className="video-grid">
          {visibleVideos.map((video,index) => {
            // <video key={video.id} src={video.src} controls className="video-item-gallery" />
            return (
              <>
                <iframe
                  key={index}
                  src={video}
                  // title={video.type}
                  className="video-item-gallery"
                  allowFullScreen></iframe>
              </>
            );
          })}
        </div>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={videosPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          innerClass="pagination"
        />
      </div>
    </div>
  );
};

export default Videos;
