import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import { CircularProgress } from '@mui/material';

const Patron = () => {
    const [patronData, setPatronData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/Pages`);
                setPatronData(response?.data?.data);
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

    if (!patronData || patronData.length === 0) {
        return <div className='text-center mt-5'><b>No Patron Data Available</b></div>;
    }

    const filteredData = patronData.filter(item => item.id === 4);

    if (filteredData.length === 0) {
        return <div className='text-center mt-5'><b>No matching data found</b></div>;
    }
    const patronItem = filteredData[0];
    return (
        <>
            <div className="container subpage">
                <h2 className="heading">{patronItem.title}</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <p style={{ textAlign: "justify" }}>
                            <div dangerouslySetInnerHTML={{ __html: patronItem.content }} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Patron;
