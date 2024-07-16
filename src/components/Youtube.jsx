import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiUrl } from "../components/API/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./css/youtube.css";
import { Link } from "react-router-dom";

const Youtube = () => {
  const [newsletterdata, setNewsletterdata] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${ApiUrl}/get/newsletter`)
      .then((response) => {
        const allData = response?.data?.data;
        const latestData = allData.slice(0, 3);
        setNewsletterdata(latestData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching newsletter data:", error);
      });
  }, []);
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

    if (circlePlayButton && video) {
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
    }
  }, [newsletterdata]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="section-heading">
            <h2 className="entry-title mt-3">Latest Video</h2>
          </div>
          <div className="video-wrapper mb-4">
            <div className="video-container" id="video-container">
              <video
                controls
                playsInline
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
            <h2 className="entry-title mt-3">Monthly Newsletter</h2>
          </div>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "200px" }}
            >
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only text-center">
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                </span>
              </div>
            </div>
          ) : (
            <div className="newsletter mb-4">
              {newsletterdata && newsletterdata.length > 0 ? (
                newsletterdata?.map((newsletter) => (
                  <div
                    key={newsletter?.id}
                    className="card shadow mb-2"
                    style={{ maxWidth: "585px", height: "100px" }}
                  >
                    <div className="card-body text-center">
                      <div className="d-flex justify-content-between align-items-center">
                        <img
                          src="images/all-img/pdf.png"
                          alt="PDF Icon"
                          className="mb-5"
                          style={{ width: "50px" }}
                        />
                        <div className="text-center mb-4">
                          <h5 className="card-title mb-2">
                            {newsletter?.title}
                          </h5>
                          <p className="card-text mb-3">
                            {newsletter?.eventdate}
                          </p>
                        </div>
                        <a
                          href={newsletter?.file_url}
                          className="btn btn-sm btn-success mb-5 mr-2 text-white"
                          download
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mt-2 mb-3">No newsletter available</div>
              )}
            </div>
          )}
          <>
            {newsletterdata.length >= 3 && (
              <center>
                <Link
                  to={"/newsletter"}
                  className="btn btn-sm btn-success mr-2 text-white"
                >
                  View More
                </Link>
              </center>
            )}
          </>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
