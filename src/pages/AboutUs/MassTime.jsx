import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApiUrl } from '../../components/API/Api';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const MassTime = () => {
    const [Masstime, setMasstimeData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/Pages`);
                setMasstimeData(response?.data?.data);
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

    if (!Masstime || Masstime.length === 0) {
        return <div className='text-center mt-5'><b>No Mass Time Data Available</b></div>;
    }

    const filteredData = Masstime.filter(item => item.id === 3);

    if (filteredData.length === 0) {
        return <div className='text-center mt-5'><b>No matching data found</b></div >;
    }

    const massTimeItem = filteredData[0];
    return (
        <>
            <div className="container subpage">
                <div className="row">
                    <div className="col-lg-12">
                        <h2 className="heading">{massTimeItem.title}</h2>
                        <p style={{ textAlign: "justify" }}>
                            <div dangerouslySetInnerHTML={{ __html: massTimeItem.content }} />
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MassTime
