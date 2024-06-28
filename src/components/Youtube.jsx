import React, { useEffect } from "react";
import './css/youtube.css';
import ImageGallery from "react-image-gallery";

const Youtube = ({gallerydata}) => {
  useEffect(() => {
    const video = document.getElementById("video");
    const circlePlayButton = document.getElementById("circle-play-b");

    function togglePlay() {
      if (video.paused || video.ended) {
        video.play();
      } else {
        video.pause();
      }
    }

    circlePlayButton.addEventListener("click", togglePlay);
    video.addEventListener("playing", () => {
      circlePlayButton.style.opacity = 0;
    });
    video.addEventListener("pause", () => {
      circlePlayButton.style.opacity = 1;
    });

    return () => {
      circlePlayButton.removeEventListener("click", togglePlay);
      video.removeEventListener("playing", () => {
        circlePlayButton.style.opacity = 0;
      });
      video.removeEventListener("pause", () => {
        circlePlayButton.style.opacity = 1;
      });
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="section-heading">
            <h2 className="entry-title mt-5">Latest Video</h2>
          </div>
          <div className="video-wrapper mb-4">
            <div className="video-container" id="video-container">
              <video
                controls
                playsInline
                autoPlay
                loop
                id="video"
                preload="metadata"
                poster="images/all-img/slider24 (2).jpeg"
                className="video"
              >
                <source
                  src="videos/kurnool.mp4"
                  type="video/mp4"
                  id="video-source"
                />
              </video>
              <div className="play-button-wrapper">
                <div title="Play video" className="play-gif" id="circle-play-b">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
                    <path d="M40 0a40 40 0 1040 40A40 40 0 0040 0zM26 61.56V18.44L64 40z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="section-heading">
            <h2 className="entry-title mt-5">Our Gallery</h2>
          </div>
          <div className="gallery mb-5">
              <ImageGallery items={gallerydata.map(image => ({
                original: image.image || '',
                thumbnail: image.image || ''
            }))} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube;

