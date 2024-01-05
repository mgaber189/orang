import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/images/images.css";
import { instance } from '../../api/axios';
const Images = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images,setImages]=useState([])
  const imagesPerPage = 36;
  const getImagesHandler=()=>{
    instance.get('Gallery').then((res)=>{
      setImages(res?.data?.data)
    }).catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getImagesHandler();
  },[])
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const filteredImages =
    activeFilter === 'All' ? images : images.filter((image) => image.type === activeFilter);

  // Pagination logic
  const totalItemsCount = filteredImages.length;
  const totalPages = Math.ceil(totalItemsCount / imagesPerPage);
  const startIndex = (activePage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const visibleImages = filteredImages.slice(startIndex, endIndex);

  // Handle click on an image
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };
  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="image-gallery">
      <div className="filter-bar">
        {/* Filter buttons here */}
        <button
            className={`filter-button ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterClick('All')}
          >
            All
          </button>
          <button
            className={`filter-button ${activeFilter === 'Panoramic View' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Panoramic View')}
          >
            Panoramic view
          </button>
          <button
            className={`filter-button ${activeFilter === 'Relax' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Relax')}
          >
           Relax
          </button>
          <button
            className={`filter-button ${activeFilter === 'Joy and Fun' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Joy and Fun')}
          >
            Joy & fun 
          </button>
          <button
            className={`filter-button ${activeFilter === 'Dining' ? 'active' : ''}`}
            onClick={() => handleFilterClick('Dining')}
          >
            Dine 
          </button>
      </div>
      <div className="image-grid">
        {visibleImages.map((image) => (
          <img
            key={image?.id}
            src={image?.photoUrl}
            alt={image?.type}
            className="image-item-gallery"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={imagesPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        innerClass="pagination"
      />

      {/* Modal for displaying the clicked image */}
      <Modal size="xl" show={showModal} onHide={handleCloseModal}>
        <Modal.Body>
          {selectedImage && (
            <img src={selectedImage?.photoUrl} alt={selectedImage?.type} className="modal-image" />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Images;
