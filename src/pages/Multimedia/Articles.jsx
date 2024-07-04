import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './Articles.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/resource/category/3`);
        setArticles(response?.data?.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
      setLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Articles</h2>
      {loading ? (
        <div className="text-center my-5">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center mt-5 font-weight-bold">No data available</p>
      ) : (
        articles?.map((article) => (
          <div key={article?.id} className="card mb-3">
            <div className="card-body text-justify">
              <h3><i className="fa fa-edit"></i> {article?.title}</h3>
              <p><i className="fa fa-calendar"></i> {article?.eventdate}</p>
              <p
                dangerouslySetInnerHTML={{__html: article?.content}}
                className="custom-scrollbar"
              ></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Articles;
