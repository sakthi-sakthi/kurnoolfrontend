import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ApiUrl } from '../../components/API/Api';
import Pagination from 'react-bootstrap/Pagination';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

const ReligiousSisters = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [program, setProgram] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${ApiUrl}/get/kurnooldiocese/preist/7?page=${currentPage}&limit=${itemsPerPage}`);
                setData(response?.data?.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const handleClick = (item) => {
        setProgram(item);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentData = data.slice(firstIndex, lastIndex);

    return (
        <div className="container">
            <h3 className="text-center mt-3 mb-3">
                Seminarians</h3>
            {loading ? (
                <p className="text-center font-weight-bold"><FontAwesomeIcon icon={faSpinner} spin size="2x" /></p>
            ) : (
                <table className="table table-striped table-bordered" style={{ width: '100%' }}>
                    <thead className="thead-dark">
                        <tr>
                            <th>S.No</th>
                            <th>Name of the Seminaraian</th>
                            <th>Year</th>
                            <th>Place of Study</th>
                            <th>View More</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.length > 0 ? (
                            currentData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{firstIndex + index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>{item?.feast_day}</td>
                                    <td>{item?.ministry}</td>
                                    <td>
                                        <button className="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#viewModal" onClick={() => handleClick(item)}><i className="fa fa-eye"></i></button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center font-weight-bold text-danger">No Record found</td>
                            </tr>
                        )}
                    </tbody>
                    <div className="modal fade" id="viewModal" tabIndex="-1" aria-labelledby="viewModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="viewModalLabel">{program?.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Name of the Seminaraian: </strong>{program?.name}</p>
                                    <p><strong>Year: </strong>{program?.feast_day}</p>
                                    <p><strong>Place of Study: </strong>{program?.ministry}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </table>
            )}
            <Pagination className="mt-3" size="sm">
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / itemsPerPage)} />
            </Pagination>
        </div>
    );
};

export default ReligiousSisters;
