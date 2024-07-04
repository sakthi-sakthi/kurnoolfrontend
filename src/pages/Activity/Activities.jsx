import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import './activity.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Activities = () => {
    const [loading, setLoading] = useState(true);
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/resource/category/2`);
                setLatestNews(response?.data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <section>
            <div className="container">
                <div className="col-12">
                    <div className="section-heading mt-3">
                        <h2 className="text-center mb-4">Activities</h2>
                    </div>
                </div>
                <div className="row">
                    {loading ? (
                        <p className="text-center mt-3 mb-3 font-weight-bold"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></p>
                    ) : latestNews.length === 0 ? (
                        <p>No data available.</p>
                    ) : (
                        latestNews?.map((newsItem, index) => (
                            <div className="col-md-4" key={index} id="latestnews">
                                <div className="card card-02">
                                    <img
                                        className="card-img-top"
                                        src={newsItem?.media_url || "images/all-img/noimage.jpg"}
                                        alt="No Data"
                                    />
                                    <div className="card-body">
                                        <i className="fa fa-calendar mr-1 fa-1x" /> {newsItem?.eventdate || "Date not available"}
                                        <br />
                                        <br />
                                        <h4 className="card-title"><Link to={`/all-activity?activityid=${encodeURIComponent(btoa(newsItem.id))}`}>{newsItem?.title || "Title not available"}</Link></h4>
                                        <Link to={`/all-activity?activityid=${encodeURIComponent(btoa(newsItem.id))}`} className="btn btn-primary" id='btnmore'>
                                            View More
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

export default Activities;