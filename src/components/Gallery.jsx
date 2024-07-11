import React, { useState, useEffect, useRef } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ApiUrl } from "./API/Api";

const GalleryImages = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/gallery`)
      .then((response) => {
        if (Array.isArray(response?.data?.data)) {
          const groupedCategories = response?.data?.data?.reduce(
            (acc, item) => {
              const category = acc.find((cat) => cat.title === item.title);

              if (category) {
                category.images.push(item.image);
              } else {
                acc.push({
                  title: item.title,
                  images: [item.image],
                  date: item.date,
                });
              }

              return acc;
            },
            []
          );

          groupedCategories.sort((a, b) => b.date - a.date);
          const latestCategories = groupedCategories.slice(0, 4);
          setCategories(latestCategories);
        } else {
          console.error("Invalid API response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching gallery images:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleThumbnailClick = (category) => {
    setSelectedCategory(category);
    setModalImages(category.images);
    setModalShow(true);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(0);
    }
  };

  const slickSettings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
  };

  return (
    <div className="container">
      <div className="section-heading">
        <h2 className="entry-title">Gallery</h2>
      </div>

      {loading ? (
        <div className="mt-2 mb-3">Loading...</div>
      ) : categories.length === 0 ? (
        <div className="mt-2 mb-3">No gallery images available.</div>
      ) : (
        <div className="row">
          {categories?.map((category, catIndex) => (
            <div key={catIndex} className="col-md-3 col-sm-6 mb-3">
              <div style={{ position: "relative" }}>
                <img
                  src={category?.images[0]}
                  alt={`${category?.title} Thumbnail`}
                  className="img-thumbnail fixed-thumbnail"
                  onClick={() => handleThumbnailClick(category)}
                  style={{ cursor: "pointer", width: "100%", height: "200px" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {/* {category?.title} */}
                  </p>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.7)",
                    padding: "5px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {/* {category?.title} */}
                  </p>
                </div>
                <p className="text-center mt-2 mb-0 font-weight-bold" style={{ fontSize: "12px" }}>
                  {category?.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal show={modalShow} onHide={() => setModalShow(false)} size="md">
        <ModalBody style={{ width: "100%", height: "24rem" }}>
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <button
              className="close"
              onClick={() => setModalShow(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {selectedCategory && (
            <div>
              <h3 style={{fontSize: "15px",textAlign: "center"}}>{selectedCategory?.title}</h3>
            </div>
          )}
          <div className="slick-slider-container">
            <button
              className="slick-prev"
              onClick={() => sliderRef.current.slickPrev()}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <Slider {...slickSettings} ref={sliderRef}>
              {modalImages?.map((imageUrl, imgIndex) => (
                <div key={imgIndex}>
                  <img
                    src={imageUrl}
                    alt={`Modal ${imgIndex + 1}`}
                    className="img-fluid d-block w-100"
                    style={{ height: "300px" }}
                  />
                </div>
              ))}
            </Slider>
            <button
              className="slick-next"
              onClick={() => sliderRef.current.slickNext()}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default GalleryImages;
