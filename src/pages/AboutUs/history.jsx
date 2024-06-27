import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { CircularProgress } from '@mui/material';

function History() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages`);
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
    return <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '5em' }} />;
  }

  if (!data || data.length === 0) {
    return <div className='text-center mt-5'><b>No History Data Available</b></div>;
  }

  const filteredData = data.filter(item => item.id === 1);

  if (filteredData.length === 0) {
    return <div className='text-center mt-5'><b>No matching data found</b></div >;
  }

  return (
    <>
      <div className="container subpage">
        <div className="row">
          <div className="col-lg-12">
            {filteredData.map(item => (
              <div key={item.id}>
                <h2 className="heading">{item.title}</h2>
                <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: `<style>table { width: 100%; max-width: 100%; border-collapse: collapse; } table, th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } @media (max-width: 600px) { table, th, td { display: block; width: 100%; box-sizing: border-box; } } </style>${item.content}` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
