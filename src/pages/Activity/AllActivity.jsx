import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { Link, useLocation } from 'react-router-dom';
import './AllActivity.css';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f8f9fa;
`;

const NewsDetails = styled.div`
  padding: 20px;
`;

const NewsTitle = styled.h2`
  font-size: 23px;
  margin-bottom: 10px;
  font-weight: 600;
`;

const NewsCategory = styled.p`
  color: #666;
  margin-bottom: 10px;
  font-weight: 500;
`;

const NewsContent = styled.div`
  line-height: 1.6;
  margin-bottom: 10px;
  text-align: justify;
  text-justify: inter-word;
  letter-spacing: 0.5px;
  word-spacing: 0.5px;
  overflow-y: clip!important;
  -webkit-overflow-scrolling: touch;
  height: 300px;
  &:hover {
    overflow-y: overlay;
    &::-webkit-scrollbar {
      display: block;
    }
  }
  &::-webkit-scrollbar {
    width: 5px;
    display: none;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const AllActivity = () => {
  const search = useLocation().search;
  const encryptedId = new URLSearchParams(search).get("activityid");
  const activityid = parseInt(atob(decodeURIComponent(encryptedId)));

  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/resource/category/2`);
        const newsData = response.data.data|| [];
        const selected = newsData.find(item => item.id === activityid);
        setSelectedNews(selected || null);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };
    fetchNewsData();
  }, [activityid]);

  return (
    <Container className="latest-news-container mt-3">
      {selectedNews && (
        <div className="container">
          <h3 className="text-center">Latest Activity</h3>
          <div className="row">
            <div className="col-md-12">
              <NewsDetails>
                <img src={selectedNews.media_url || "images/all-img/noimage.jpg"} alt={selectedNews.title} className="news-image" />
                <br />
                <NewsTitle><i className="fa fa-newspaper-o"></i> {selectedNews.title}</NewsTitle>
                <NewsCategory><i className="fa fa-tag"></i> {selectedNews.category_name}</NewsCategory>
                <NewsCategory><i className="fa fa-calendar"></i> {selectedNews.eventdate}</NewsCategory>
                <NewsCategory><i className="fa fa-download"></i><a href={selectedNews.file_url} target="_blank" rel="noopener noreferrer"> {selectedNews.file_url.split('/').pop()}</a></NewsCategory>
                <NewsContent>
                  <div className="row mt-3">
                    <div className="col-lg-12">
                      <p dangerouslySetInnerHTML={{ __html: selectedNews.content }}></p>
                    </div>
                  </div>
                </NewsContent>

                <Link to={'/activity'} className="btn btn-success btn-sm mt-3 mb-3 text-white" style={{ float: "right" }}><i className="fa fa-home"></i> Go Home</Link>
              </NewsDetails>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default AllActivity;