import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ApiUrl } from '../../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ReligiousPriest = () => {
    const search = useLocation().search;
    const encryptedId = new URLSearchParams(search).get("rpid");
    const rpid = parseInt(atob(decodeURIComponent(encryptedId)));
    
    const [detailData, setDetailData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/kurnooldiocese/preist/8`);
                const filteredData = response?.data?.data.filter(item => item.id === parseInt(rpid));
                setDetailData(filteredData[0]);
            } catch (error) {
                console.error('Error fetching detail data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (rpid) {
            fetchDetailData();
        }
    }, [rpid]);

    return (
        <div className="container">
            {loading ? (
                <p className="text-center font-weight-bold"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></p>
            ) : (
                <div>
                    {!detailData?.history ? (
                        <p className="text-center font-weight-bold">No data found</p>
                    ) : (
                        <div>
                            <h3 className="text-center mt-3 mb-3">{detailData?.name}</h3>

                            <p className="text-justify mt-3 mb-3" dangerouslySetInnerHTML={{__html: detailData?.history}}></p>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
};

export default ReligiousPriest;

