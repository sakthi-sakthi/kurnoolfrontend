import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ApiUrl } from '../../components/API/Api';

function YouthCommission() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/commissions/4`);
        setData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <b><FontAwesomeIcon icon={faSpinner} spin size="2x" /></b>
      </div>
    );
  }

  const [latestItem, ...olderItems] = data;

  return (
    <>
      {data.length === 0 ? (
        <div className="container subpage">
          <div className="row">
            <div className="col-lg-12">
              <p className="text-center mb-4 mt-3">No data available</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container subpage">
          <div className="row">
            <div className="col-lg-12">
              <h3 className="text-center mb-4 mt-3">{latestItem?.title}</h3>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: `${latestItem?.content}`,
                }}
              />
            </div>
            <div className="col-lg-12 mt-3">
              <div className="accordion" id="olderItemsAccordion">
                {olderItems?.map((item) => (
                  <div className="accordion-item border-bottom mb-3" key={item?.id}>
                    <h2 className="accordion-header" id={`heading${item?.id}`}>
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${item?.id}`}
                        aria-expanded="true"
                        aria-controls={`collapse${item?.id}`}
                      >
                        {item?.title}
                      </button>
                    </h2>
                    <div
                      id={`collapse${item?.id}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${item?.id}`}
                      data-bs-parent="#olderItemsAccordion"
                    >
                      <div className="accordion-body">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `${item?.content}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <style jsx global>{`
        .accordion-body {
          max-height: 410px;
          overflow-y: auto;
        }

        .accordion-body::-webkit-scrollbar {
          width: 3px;
        }

        .accordion-body::-webkit-scrollbar-track {
          background-color: #f1f1f1;
        }

        .accordion-body::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 4px;
        }

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

export default YouthCommission;