import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/news.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LatestNews = ({ projectdata }) => {
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    if (projectdata) {
      const news =
        projectdata?.filter((item) => item?.category_id === 1).slice(0, 3) ||
        [];
      setLatestNews(news);
      setLoading(false);
    }
  }, [projectdata]);

  return (
    <section>
      <div className="container">
        <div className="col-12">
          <div className="section-heading mt-3">
            <h2 className="entry-title">News & Events</h2>
          </div>
        </div>
        <div className="row">
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
          ) : latestNews.length === 0 ? (
            <div>
              <p className="mt-2 ml-3">No news available</p>
            </div>
          ) : (
            latestNews?.map((newsItem, index) => (
              <div className="col-md-4" key={index} id="latestnews">
                <div className="card card-01">
                  <img
                    className="card-img-top"
                    src={newsItem?.media_url || "images/all-img/noimage.jpg"}
                    alt="No Data"
                  />
                  <div className="card-body">
                    <i className="fa fa-calendar mr-1 fa-1x" />{" "}
                    {newsItem?.eventdate || "Date not available"}
                    <br />
                    <br />
                    <h4 className="card-title">
                      <Link
                        to={`/all-latest-news?newsid=${encodeURIComponent(
                          btoa(newsItem.id)
                        )}`}
                      >
                        {newsItem?.title || "Title not available"}
                      </Link>
                    </h4>
                    <p
                      className="card-text mt-4"
                      dangerouslySetInnerHTML={{
                        __html:
                          newsItem?.content?.split(" ").slice(0, 11).join(" ") +
                          (newsItem?.content?.split(" ").length > 100
                            ? "..."
                            : ""),
                      }}
                    ></p>
                    <Link
                      to={`/all-latest-news?newsid=${encodeURIComponent(
                        btoa(newsItem.id)
                      )}`}
                      className="btn btn-primary"
                      id="btnmore"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
          <>
            {latestNews.length >= 3 && (
              <center>
                <Link
                  to="/news"
                  className="btn btn-primary"
                  id="btnmore"
                >
                  View More
                </Link>
              </center>
            )}
          </>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
