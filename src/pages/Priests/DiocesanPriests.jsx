import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { ApiUrl } from "../../components/API/Api";
import { Link, useLocation } from "react-router-dom";
import moment from 'moment-timezone';
import PriestSkeletonLoader from "./PriestSkeletonLoader";
const DiocesanPriests = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [categoryName, setCategoryName] = useState("Diocesean Priests");
  const [loading, setLoading] = useState(true); // Added loading state
  const itemsPerPageOptions = [10, 50, 100];
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location?.search);
  const CategoryFromUrlId = searchParams.get("from");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when starting the fetch
        const response = await axios.get(
          `${ApiUrl}/get/sultanpet/preist/${parseInt(CategoryFromUrlId)}`
        );
        setData(response?.data?.data || []);
        if (response?.data?.data?.length > 0) {
          if (CategoryFromUrlId !== "priest") {
            setCategoryName(response.data.data[0].category_name);
          } else {
            setCategoryName("PRIESTS");
          }
        }
      } catch (error) {
        setError(error);
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
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredData = currentData.filter((item) => {
    return Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (columnA < columnB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    })
    : filteredData;

  const formatDate = (dateString) => {
    const formattedDate = moment(dateString).tz('Asia/Kolkata').format('DD-MM-YYYY');
    return formattedDate;
  };

  return (
    <div className="container">
       {loading && <PriestSkeletonLoader />}
      {!loading && (
        <>
          {data.length === 0 ? (
            <div className="center-message">
              <p>No Data Available</p>
            </div>
          ) : (
            <div className="table-container">
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
                        onChange={(e) => {
                          setItemsPerPage(parseInt(e.target.value, 10));
                          setCurrentPage(1);
                        }}>
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
                    <th>S.No</th>
                    <th onClick={() => handleSort("image")}>Image</th>
                    <th onClick={() => handleSort("name")}>Priest Name</th>
                    <th onClick={() => handleSort("date_of_ordination")}>
                      Ordination Date
                    </th>
                    <th onClick={() => handleSort("date_of_birth")}>
                      Birthday Date
                    </th>
                    <th onClick={() => handleSort("roles")}>
                      Roles
                    </th>
                    <th onClick={() => handleSort("address")}>Address</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData?.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td style={{ width: "80px", height: "87px" }}>
                        <span>
                          <img
                            src={`${item.image}`}
                            alt="Diocesan Priest Icon"
                            style={{ width: "80px", height: "87px" }}
                          />
                        </span>
                      </td>
                      <td>{item.name}</td>
                      <td>{formatDate(item.date_of_ordination)}</td>
                      <td>{formatDate(item.date_of_birth)}</td>
                      <td>{item.roles}</td>
                      <td>{item.address}</td>
                      <td>
                        <Link
                          to={`/priestmoredetails?di=${item.id}&from=${CategoryFromUrlId}`}
                          style={{ color: "black" }}>
                          More Details
                        </Link>
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
            </div>
          )}
        </>
      )}

      {/* Display error message */}
      {error && (
        <div className="center-message">
          <p>Error fetching data: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default DiocesanPriests;
