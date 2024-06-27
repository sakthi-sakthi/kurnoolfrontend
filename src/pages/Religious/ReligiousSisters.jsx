import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Form, FormControl } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ApiUrl } from '../../components/API/Api';
import { CircularProgress } from '@mui/material';

const ReligiousSisters = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [categoryName, setCategoryName] = useState('Religious Details');
    const itemsPerPageOptions = [10, 50, 100];
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = new URLSearchParams(location?.search);
    const CategoryFromUrlId = searchParams.get("from");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${ApiUrl}/get/sultanpet/religio/${parseInt(CategoryFromUrlId)}`);
                const responseData = response?.data;
                setData(responseData?.data || []);
                if (responseData?.data?.length > 0) {
                    setCategoryName(responseData.data[0].category_name);
                }
            } catch (error) {
                setError(`Error fetching data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [CategoryFromUrlId]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSort = (column) => {
        setSortColumn(column);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value, 10);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const filteredData = currentData.filter((item) => {
        return Object.values(item).some(
            (value) =>
                typeof value === 'string' &&
                value.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedData = sortColumn
        ? [...filteredData].sort((a, b) => {
            const columnA = a[sortColumn];
            const columnB = b[sortColumn];

            if (columnA < columnB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (columnA > columnB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        })
        : filteredData;

    return (
        <>
            <div className="container">
                {!loading && !error && (
                    <>
                        {data.length === 0 ? (
                            <div className="center-message">
                                <p>No Data Available</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="heading">{categoryName}</h3>
                                <Form className="mb-3">
                                    <div className="row">
                                        <div className="col-md-12 col-sm-12 mb-2">
                                            <FormControl
                                                type="text"
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </div>
                                        <div className="col-md-1 col-sm-12">
                                            <Form.Group controlId="itemsPerPageDropdown">
                                                <Form.Label className="mr-2">Show</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={itemsPerPage}
                                                    onChange={handleItemsPerPageChange}
                                                >
                                                    {itemsPerPageOptions.map((option) => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Form>

                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            {/* <th>ID</th> */}
                                            <th onClick={() => handleSort('image')}>Images</th>
                                            <th onClick={() => handleSort('name')}>Name</th>
                                            {/* {categoryName !== "Men Religious" && <th onClick={() => handleSort('date_of_birth')}>Date of Birth</th>}
                                            {categoryName !== "Men Religious" && <th onClick={() => handleSort('date_of_ordination')}>Ordination Date</th>} */}
                                            <th onClick={() => handleSort('ministry')}>Ministry</th>
                                            <th onClick={() => handleSort('address')}>Address</th>
                                            <th>View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedData?.map((item) => (
                                            <tr key={item.id}>
                                                {/* <td>{item.id}</td> */}
                                                <td>
                                                    <span>
                                                        <img src={item.image} alt="Icon" style={{ width: '50px', height: '50px' }} />
                                                    </span>
                                                </td>
                                                <td>{item.name}</td>
                                                {/* {categoryName !== "Men Religious" && <td>{item.date_of_birth}</td>}
                                                {categoryName !== "Men Religious" && <td>{item.date_of_ordination}</td>} */}
                                                <td>{item.ministry}</td>
                                                <td>{item.address}</td>
                                                <td>
                                                    <Link to={`/religiousmoredetails?di=${item.id}&from=${CategoryFromUrlId}`} style={{ color: "black" }}>More Details</Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>

                                {/* Pagination */}
                                {data.length > itemsPerPage && (
                                    <div>
                                        <ul className="pagination">
                                            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                                    <button onClick={() => paginate(index + 1)} className="page-link" style={{ cursor: "pointer" }}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                {loading && (
                    <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: '20em' }} />
                )}
                {error && (
                    <div className="center-message">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default ReligiousSisters;
