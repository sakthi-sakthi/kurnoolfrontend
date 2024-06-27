import React, { useState, useEffect } from 'react';
import { ApiUrl } from '../../components/API/Api';

const Youth = () => {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${ApiUrl}/get/Pages`);
        const responseData = await response.json();
        if (responseData && Array.isArray(responseData.data)) {
          const pageWithId6 = responseData.data.find(page => page.id === 8);
          setPageData(pageWithId6);
        } else {
          console.error('Invalid data format:', responseData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!pageData) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1 style={{ fontSize: '30px'}}>{pageData.title}</h1>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
    </div>
  );
};

export default Youth;
