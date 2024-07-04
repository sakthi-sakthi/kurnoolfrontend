import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ApiUrl } from '../../components/API/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ReligiousData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/kurnooldiocese/preist/8`);
                setData(response?.data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">Religious Priests</h3>
            {loading ? (
                <p className="text-center font-weight-bold"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></p>
            ) : (
                <table className="table table-striped table-bordered" style={{ width: '100%' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Congregation Name</th>
                            <th>View More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>
                                        <Link to={`/detail-priest?rpid=${encodeURIComponent(btoa(item.id))}`} className="btn btn-success btn-sm">
                                            <i className="fa fa-eye"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center font-weight-bold text-danger">No Record found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReligiousData;
