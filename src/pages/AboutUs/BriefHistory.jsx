import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function BriefHistory() {
  const location = useLocation();
  const url = location.pathname;

  const path = {
    '/history': 1,
    '/diocesan-curia': 2,
    '/aboutus': 3,
    '/college-consult': 4,
    '/senate-members': 5,
    '/marriage-tribunal': 6,
    '/birthday-calendar': 7,
    '/ordination-calendar': 8,
    '/necrology': 9,
  };
  const pageId = path[url] ? path[url] : url;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ApiUrl}/get/pages/${pageId}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId]);

  const filteredData = Array.isArray(data) ? data.find((item) => item.id === pageId) : null;

  return (
    <>
      {loading ? (
        <div className="container subpage">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center my-5">
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              </div>
            </div>
          </div>
        </div>
      ) : filteredData ? (
        <div className="container subpage">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center mb-3">{filteredData.title}</h3>
              <div className="content" dangerouslySetInnerHTML={{ __html: filteredData.content || '' }} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container subpage">
          <div className="row">
            <div className="col-lg-12">
              <p className="text-center mt-5 font-weight-bold">No data available</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BriefHistory;