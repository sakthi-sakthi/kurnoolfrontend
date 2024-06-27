import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { CircularProgress } from '@mui/material';

const Monthlyprogramme = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${ApiUrl}/get/Pages`)
            .then(response => {
                setData(response?.data?.data || []);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const filteredData = data.filter(item => item.id === 5);

    return (
        <div className="container mt-5">
            <h2>Bishop's Monthly Programme</h2>

            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto' }} />}

            {!loading && filteredData.length === 0 && <h6><b>No Data Available</b></h6>}

            {!loading && filteredData.length > 0 && (
                <div className="custom-layout mt-3">
                    {filteredData.map(item => (
                        <div key={item.id} className="custom-item">
                            <div dangerouslySetInnerHTML={{ __html: item.content }} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Monthlyprogramme;
