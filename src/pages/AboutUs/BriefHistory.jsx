import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';

function BriefHistory() {
  const location = useLocation();
  const url = location.pathname;

  const path = {
    '/history': 1,
    '/diocesan-curia': 2,
    '/aboutus':3,
    '/college-consult':4 
  };
  const pageId = path[url] ? path[url] : url;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
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

  if (loading) {
    return (
      <div className="text-center mt-5">
        <b>Loading...</b>
      </div>
    );
  }

  const filteredData = Array.isArray(data) ? data.filter((item) => item.id === pageId) : [];

  return (
    <>
      <div className="container subpage">
        <div className="row">
          <div className="col-lg-12">
            <h2 className="text-center mb-2">{filteredData[0]?.title}</h2>
            {filteredData?.map((item) => (
              <div key={item.id}>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{
                    __html: `${item.content}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .content {
            text-align: justify !important;
            font-size: 14px !important;
          }

          .content img {
            max-width: 100% !important;
            height: auto !important;
          }

          .content table {
            width: 100% !important;
            border-collapse: collapse !important;
          }

          .content table th,
          .content table td {
            padding: 8px !important;
            border: 1px solid #ddd !important;
          }
        }
      `}</style>
    </>
  );
}

export default BriefHistory;
