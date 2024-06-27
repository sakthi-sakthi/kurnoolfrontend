import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import CircularProgress from '@mui/material/CircularProgress';

const Cathedral = () => {
    const [cathedral, setCathedralData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/Pages`);
                setCathedralData(response?.data?.data);
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

    if (!cathedral || cathedral.length === 0) {
        return <div className='text-center mt-5'><b>No Cathedral Data Available</b></div>;
    }

    const filteredData = cathedral.filter(item => item.id === 2);

    if (filteredData.length === 0) {
        return <div className='text-center mt-5'><b>No matching data found</b></div >;
    }

    const cathedralItem = filteredData[0];

    return (
        <>
            <div className="container subpage">
                <h2 className="heading">{cathedralItem.title}</h2>
                <div className="row">
                    <div className="col-lg-12">
                        <p style={{ textAlign: "justify" }}>
                            <div dangerouslySetInnerHTML={{ __html: cathedralItem.content }} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cathedral;
