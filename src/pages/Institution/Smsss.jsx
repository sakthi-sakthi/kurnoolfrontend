import React, { useEffect, useState } from 'react';
import { ApiUrl } from '../../components/API/Api';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import '@mui/material/styles';

const Smsss = () => {
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiUrl = `${ApiUrl}/get/Pages`;
    axios.get(apiUrl)
      .then(response => {
        const allPages = response?.data?.data;
        const pageWithId10 = allPages.find(page => page.id === 10);
        setPageData(pageWithId10);
      })
      .catch(error => {
        console.error('Error fetching page data:', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className="col-md-12 md-2 mt-5">
        {isLoading && <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '5em' }} />}
        {hasError && <p>Error loading data.</p>}
        {pageData && (
          <>
            <div className="mt-4" dangerouslySetInnerHTML={{ __html: pageData.content }} />
          </>
        )}
      </div>
      <style jsx>{`
        @media (max-width: 767px) {
          
          img {
            max-width: 100%;
            height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Smsss;
