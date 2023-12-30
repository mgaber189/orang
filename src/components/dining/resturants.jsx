import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import "../../css/dining/resturants.css";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { instance } from "../../api/axios";

const ImageGallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const getResturants = () => {
    instance
      .get("Dining", {
        params: {
          diningCategoryId: category,
        },
      })
      .then((res) => {
        console.log(res);
        setImages(res?.data?.data);
      })
      .catch((err) => {});
  };
  useEffect(() => {
    getResturants();
  }, [category]);
  console.log(images);
  const handleFilterClick = (filter) => {
    setCategory(filter);
  };
  const PrevArrow = (props) => (
    <button
      {...props}
      className="slick-arrow slick-prev"
      onClick={props.onClick}>
      <i class="fa-sharp fa-solid fa-arrow-left"></i>
    </button>
  );
  const NextArrow = (props) => (
    <button
      {...props}
      className="slick-arrow slick-next"
      onClick={props.onClick}>
      <i class="fa-sharp fa-solid fa-arrow-right"></i>
    </button>
  );
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: null,
    nextArrow: null,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // const images = [
  //   { id: 1, type: 'Restaurants', src: 'resturant1.png', title: 'Dolphin Resturant' , text: 'Dolphin Resturant is located on the ground floor to your right hand side once you enter the island. This restaurant consists of a buffet style dining experience. Our chefs using only the freshest ingredients Egypt has to offer a wide variety of dishes; from different types of meat, mixed vegetables, soups, stews, breads and salads. '},
  //   { id: 2, type: 'Restaurants', src: 'resturant2.png', title: 'Turtle Resturant' , text: ' Pizza makes anything possible. People don’t normally come to Hurghada or the Red Sea in general looking for good pizzaPizza makes anything possible. People don’t normally come to Hurghada or the Red Sea in general looking for good pizzaPizza makes anything possible. People don’t normally come to Hurghada or the Red Sea in general looking for good .' },
  //   { id: 4, type: 'Lounges', src: 'resturant4.png', title: ' Mermaid Lounge' ,text: 'Dolphin Resturant is located on the ground floor to your right hand side once you enter the island. This restaurant consists of a buffet style dining experience. Our chefs using only the freshest ingredients Egypt has to offer a wide variety of dishes; from different types of meat, mixed vegetables, soups, stews, breads and salads. '},
  //   { id: 5, type: 'Bars', src: 'bar1.png', title: 'Swing Bar' ,text:'This particular watering hole is quite the unique experience and Orange Bays pride. Located further down on the island where the ambience is more quite and peacefully situated near to the sea. Instead of standard bar stools our craftsmen have designed swings where you can sip on your cocktails while swaying back and forth removing your stress and worries' },
  //   { id: 6, type: 'Bars', src: 'bar2.png', title: 'Dolphin Bar ',text:'This particular watering hole is quite the unique experience and Orange Bays pride. Located further down on the island where the ambience is more quite and peacefully situated near to the sea. Instead of standard bar stools our craftsmen have designed swings where you can sip on your cocktails while swaying back and forth removing your stress and worries' },
  // ];

  const filteredImages =
    activeFilter === "All"
      ? images
      : images.filter((image) => image.type === activeFilter);
  // console.log(filteredImages)
  return (
    <div className="image-gallery">
      <div className="filter-bar">
        <button
          className={`filter-button ${activeFilter === "" ? "active" : ""}`}
          onClick={() => handleFilterClick("")}>
          All
        </button>
        <button
          className={`filter-button ${activeFilter === 1 ? "active" : ""}`}
          onClick={() => handleFilterClick(1)}>
          Restaurants
        </button>
        <button
          className={`filter-button ${activeFilter === 2 ? "active" : ""}`}
          onClick={() => handleFilterClick(2)}>
          Bars
        </button>
        <button
          className={`filter-button ${activeFilter === 3 ? "active" : ""}`}
          onClick={() => handleFilterClick(3)}>
          Lounges
        </button>
      </div>

      <div className="image-grid">
        {filteredImages.map((image) => {
          return (
            <Card key={image.id} className="image-item-wrapper">
              <Slider {...settings} className="slider-dining">
                <div>
                  <Card.Img
                    variant="top"
                    src={image?.photoUrl}
                    className="card-resturant"
                  />
                </div>
                <div>
                  <Card.Img
                    variant="top"
                    src="im14.png"
                    className="card-resturant"
                  />
                </div>
                <div>
                  <Card.Img
                    variant="top"
                    src="im3.png"
                    className="card-resturant"
                  />
                </div>
                {/* Add more images as needed */}
              </Slider>{" "}
              <Card.Body>
                <Card.Title className="card-title-dining">
                  {" "}
                  <h2> {image?.name}</h2>
                  <span>
                    {" "}
                    {/* <div className="rating float-right rating-dining">
                      {" "}
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                    </div>{" "} */}
                  </span>
                </Card.Title>

                {/* <Card.Title>{image.title}</Card.Title> */}
                <Card.Text className="card-text-dining section-description">
                  <div className="icons-dining">
                    <p className="float-left text-dark">
                      <i class="far fa-clock text-primary ml-3 mr-2"></i>
                      {image?.startFrom}{" "}
                      <i class="fas fa-long-arrow-alt-right ml-2 mt-2 text-primary"></i>{" "}
                      <span className="ml-2 text-dark"> {image?.endAt}</span>
                    </p>{" "}
                    <span>
                      <i class="fas fa-utensils float-left ml-4 mt-2 text-danger "></i>{" "}
                      <p className="text-danger float-left ml-2 mt-1 ">
                        {" "}
                        {image?.foodType}{" "}
                      </p>
                    </span>{" "}
                    {/* <a href="/videos" className='float-right mt-1'> [Video] </a>
                     <a href="/gallery" className='float-right mt-1 mr-2'> [images] </a> */}
                    <br /> <br />
                  </div>
                  {image?.description}
                </Card.Text>
                <h6 className="text-dark ml-2 start-dining">
                  {" "}
                  start from 165 USD/Person{" "}
                </h6>
                {/* <div className="hover-buttons">
                  <Link to="/gallery"> 
                    <button className="hover-button">Images</button>
                  </Link>
                  <Link to="/videos">
                    <button className="hover-button ml-4">Videos</button>
                  </Link>
                </div> */}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
