import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Newsletter.css';
import { ApiUrl } from '../../components/API/Api';

const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);

  useEffect(() => {
    const fetchNewsletters = async () => {
      const response = await axios.get(`${ApiUrl}/get/newsletter`);
      setNewsletters(response.data.data);
    };
    fetchNewsletters();
  }, []);

  return (
    <div className='container'>
      <h2 className="text-center mb-4 mt-3">Monthly Newsletter</h2>
      <div className='row'>
        {newsletters?.map(newsletter => (
          <div className='col-lg-4 col-md-6 col-sm-12 mb-4' key={newsletter.id}>
            <div className="custom-card">
              <img src={"images/all-img/newsletter.avif"} className="custom-card-img" alt={newsletter.title} />
              <div className="custom-card-body">
                <h5 className="custom-card-title text-black"><i className="fa fa-edit"></i> {newsletter.title}</h5>
                <p className="custom-card-text text-black"><i className="fa fa-calendar"></i> {newsletter.eventdate}</p>
                <p className="custom-card-text text-black text-decoration-none"><i className="fa fa-download"></i> <a href={newsletter.file_url} target="_blank" rel="noreferrer" download={newsletter.file_url}>{newsletter.file_url}</a></p>
                <a href={newsletter.file_url} target="_blank" rel="noreferrer" download={newsletter.file_url} className="btn btn-success text-white btn-sm"><i className="fa fa-download"></i> Download PDF</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Newsletter;