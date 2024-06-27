import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Scrollbar = ({ projectdata }) => {
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const latestNews = projectdata?.filter(item => item?.category_id === 9)?.slice(0, 1) || [];

  const stopScroll = () => {
    setIsScrollingAllowed(false);
  };

  const allowScroll = () => {
    setIsScrollingAllowed(true);
  };

  return (
    <>
      <div className="scrollbar">
        <div className="container">
          {latestNews.length === 0 && (
            <div className="row">
              <div className="col-12">
                <p>No latest news or upcoming events available</p>
              </div>
            </div>
          )}
          {(latestNews.length > 0) && (
            <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
              <div className="col-4 col-lg-2 d-flex">
                <div className="label ripple">Latest News</div>
              </div>
              <div className="col-8 col-lg-10 d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
                <div className="marqueenews">
                  <div className="marquee">
                    <p
                      onMouseEnter={stopScroll}
                      onMouseLeave={allowScroll}
                      onTouchStart={stopScroll}
                      onTouchEnd={allowScroll}
                      style={{ overflow: isScrollingAllowed ? "" : "hidden" }}
                    >
                      {latestNews?.map((newsItem, index) => (
                        <span key={index}>
                          <img
                            src="images/logos/output-onlinegiftools.gif"
                            style={{
                              maxWidth: "40px",
                            }}
                            alt=""
                          />
                          <Link
                            to={newsItem.link}
                            style={{ color: "white", textDecoration: "none" }}
                          >
                            {newsItem.title}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Scrollbar;
