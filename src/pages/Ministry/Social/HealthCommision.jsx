import React, { useEffect, useState } from 'react';
import { ApiUrl } from '../../../components/API/Api';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import '@mui/material/styles';

const HealthCommision = () => {
  const [healthcommisionData, setHealthCommisionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiUrl = `${ApiUrl}/get/Pages`;
    axios.get(apiUrl)
      .then(response => {
        const allPages = response?.data?.data;
        const pageWithId27 = allPages.find(page => page.id === 27);
        setHealthCommisionData(pageWithId27);
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
      {isLoading && <CircularProgress style={{ display: 'block', margin: 'auto', marginTop: '5em' }} />}
      {hasError && <p>Error loading data.</p>}
      {healthcommisionData && (
        <>
          <h1 className="text-center">{healthcommisionData.title}</h1>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: healthcommisionData.content }} />
        </>
      )}
    </div>
  );
};

export default HealthCommision;
