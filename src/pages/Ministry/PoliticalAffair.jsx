import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import '@mui/material/styles';
import { ApiUrl } from '../../components/API/Api';

const PoliticalAffair = () => {
  const [politicalaffairData, setPoliticalAffairData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const apiUrl = `${ApiUrl}/get/Pages`;
    axios.get(apiUrl)
      .then(response => {
        const allPages = response?.data?.data;
        const pageWithId40 = allPages.find(page => page.id === 40);
        setPoliticalAffairData(pageWithId40);
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
      {politicalaffairData && (
        <>
          <h1 className="text-center">{politicalaffairData.title}</h1>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: politicalaffairData.content }} />
        </>
      )}
    </div>
  );
};

export default PoliticalAffair;
