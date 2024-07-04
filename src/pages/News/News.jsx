import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const News = () => {
    const [loading, setLoading] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/resource/category/1`);
                setNews(response.data.data);
            } catch (error) {
                console.error('Error fetching news:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) {
        return <p className="text-center font-weight-bold mt-3 mb-3"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></p>;
    }

    if (news.length === 0) {
        return <p className="text-center mt-3 mb-3 font-weight-bold">No data available</p>;
    }
    return (
        <>
            <div className="container">
                <h3 className="text-center mt-3 mb-3">Latest News</h3>
                <table className="table table-striped table-bordered mt-3 table-hover d-sm-table d-md-table">
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Image</th>
                            <th>Event Title</th>
                            <th>Event Date</th>
                            <th>Catgeory</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><img src={item.media_url} alt="news" className='img-fluid' width="100" height="150" /></td>
                                <td>{item.title}</td>
                                <td>{item.eventdate}</td>
                                <td>{item.category_name}</td>
                                <td><Link to={`/allnews?allnewsid=${encodeURIComponent(btoa(item.id))}`} className="btn btn-success btn-sm text-white"><i className="fas fa-eye"></i> View</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default News

