import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import '@mui/material/styles';
import { ApiUrl } from '../../../components/API/Api';

const Aided = () => {
    const [aidedData, setAidedData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const apiUrl = `${ApiUrl}/get/Pages`;
        axios.get(apiUrl)
            .then(response => {
                const allPages = response?.data?.data;
                const pageWithId14 = allPages.find(page => page.id === 14);
                setAidedData(pageWithId14);
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
            {aidedData && (
                <>
                    <h1 className="text-center">{aidedData.title}</h1>
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: aidedData.content }} />
                </>
            )}
        </div>
    );
};

export default Aided;
