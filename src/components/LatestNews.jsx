import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './css/news.css';

const LatestNews = ({ projectdata }) => {
  const [loading, setLoading] = useState(true);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    if (projectdata) {
      const news = projectdata?.filter(item => item?.category_id === 1).slice(0, 4) || [];
      setLatestNews(news);
      setLoading(false);
    }
  }, [projectdata]);

  return (
    <section>
      <div className="container">
        <div className="col-12">
          <div className="section-heading mt-5">
            <h2 className="entry-title">Upcoming News & Events</h2>
          </div>
        </div>
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : latestNews.length === 0 ? (
            <p>No data available.</p>
          ) : (
            latestNews?.map((newsItem, index) => (
              <div className="col-md-4" key={index} id="latestnews">
                <div className="card card-01">
                  <img
                    className="card-img-top"
                    src={newsItem?.media_url || "images/all-img/noimage.jpg"}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <span className="badge-box">
                      <i className="fa fa-newspaper-o" />
                    </span>
                    <i className="fa fa-calendar mr-1 fa-1x" /> {newsItem?.eventdate || "Date not available"}
                    <i className="fa fa-user ml-3 mr-1 fa-1x" /> {newsItem?.author || "Admin"}
                    <br />
                    <br />
                    <h4 className="card-title">{newsItem?.title || "Title not available"}</h4>
                    <p className="card-text">
                      <img src='/images/all-img/tick.png' alt="Card image cap" width="20px" height="20px" />{newsItem?.content?.split(' ').slice(0, 10).join(' ').concat(newsItem?.content?.split(' ').length > 100 ? '...' : '')}
                    </p>
                    <Link to="/" className="btn btn-primary" id='btnmore'>
                      More Information
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
