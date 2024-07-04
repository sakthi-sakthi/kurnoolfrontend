import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Gallery.css';
import { ApiUrl } from '../../components/API/Api';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/gallery`);
        setImages(response?.data?.data);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Album Gallery</h2>
      <div className="row">
        {images?.map((image, index) => (
          <div className="col-lg-4 col-md-6 mb-4" key={index}>
            <div className="gallery-item">
              <img src={image.image} className="img-fluid" alt={image.title} />
              <div className="gallery-caption">
                <h5>{image.title}</h5>
                <p>{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;