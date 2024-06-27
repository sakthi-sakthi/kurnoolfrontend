import React, { useState, useEffect } from "react";
import { Table, Form, FormControl } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../../components/API/Api";
import SkeletonLoader from "./SkeletonLoader";

const Mannarkkad = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("parish_name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(30);
  const [categoryName, setCategoryName] = useState("Vicariate Details");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchParams = new URLSearchParams(location?.search);
  const CategoryFromUrlId = searchParams.get("from");

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios
        .get(`${ApiUrl}/get/sultanpet/parish/${parseInt(CategoryFromUrlId)}`)
        .then((response) => {
          setLoading(false);
          setData(response?.data?.data || []);
          if (response?.data?.data?.length > 0) {
            if (CategoryFromUrlId !== "parish") {
              setCategoryName(response.data.data[0].category_name);
            } else {
              setCategoryName("PARISHES");
            }
          }
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
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

  // Modify sortedData declaration to sort by the chosen column
  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
      const columnA = a[sortColumn].toLowerCase();
      const columnB = b[sortColumn].toLowerCase();

      if (columnA < columnB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    })
    : filteredData;

  return (
    <>
      <div className="container">
        {loading && <SkeletonLoader />}
        {!loading && !error && (
          <>
            {data.length === 0 ? (
              <div className="center-message">
                <p>No Data Available.</p>
              </div>
            ) : (
              <div className="table-container">
                <h3 className="heading">{categoryName}</h3>
                <Form inline className="mb-3 mb-sm-2">
                  <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </Form>

                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      {CategoryFromUrlId === "parish" ? (
                        ""
                      ) : (
                        <th onClick={() => handleSort("priest_image")}>
                          Priest Image
                        </th>
                      )}{" "}
                      <th onClick={() => handleSort("parish_name")}>
                        Parish Name
                      </th>
                      <th onClick={() => handleSort("parishimage")}>
                        Parish Image
                      </th>
                      {CategoryFromUrlId === "parish" ? (
                        ""
                      ) : (
                        <th onClick={() => handleSort("parish_priest")}>
                          Parish Priest
                        </th>
                      )}
                      {CategoryFromUrlId === "parish" ? (
                        ""
                      ) : (
                        <th onClick={() => handleSort("patron")}>
                          Patron Name
                        </th>
                      )}
                      <th onClick={() => handleSort("address")}>Address</th>
                      <th onClick={() => handleSort("established_year")}>
                        Year of Establishment
                      </th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData?.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        {CategoryFromUrlId === "parish" ? (
                          ""
                        ) : (
                          <td>
                            <img
                              src={item.priest_image}
                              alt="vicariate"
                              className="img-fluid"
                              width="100"
                              height="150"
                            />
                          </td>
                        )}{" "}
                        <td>{item.parish_name}</td>
                        <td>
                          <span>
                            <img src={item.parishimage} alt="Icon" style={{ width: '70px', height: '70px' }} />
                          </span>
                        </td>
                        {CategoryFromUrlId === "parish" ? (
                          ""
                        ) : (
                          <td>{item.parish_priest}</td>
                        )}
                        {CategoryFromUrlId === "parish" ? (
                          ""
                        ) : (
                          <td>{item.patron}</td>
                        )}
                        <td>{item.address}</td>
                        <td>{item.established_year}</td>
                        <td>
                          <Link
                            to={`/parishmoredetails?di=${item.id}&from=${CategoryFromUrlId}`}
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

        {error && (
          <div className="center-message">
            <p>Error fetching data: {error.message}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Mannarkkad;
