import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../../components/API/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";

const Priests = () => {
  const [filterInput, setFilterInput] = useState("");
  const [priests, setPriests] = useState([]);
  const [category11, setCategory11] = useState([]);
  const [category12, setCategory12] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl}/get/kurnooldiocese/preist/NaN`
      );
      const allData = response?.data?.data;
      const filteredPriests = allData.filter((item) => item.category_id === 10);
      const filteredCategory11 = allData.filter(
        (item) => item.category_id === 11
      );
      const filteredCategory12 = allData.filter(
        (item) => item.category_id === 12
      );
      setPriests(filteredPriests);
      setCategory11(filteredCategory11);
      setCategory12(filteredCategory12);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "S.No",
        accessor: (row, index) => index + 1,
      },
      {
        Header: "Image",
        accessor: "media_url",
        Cell: ({ row }) => (
          <img
            src={
              row.original?.media_url
                ? row.original?.media_url
                : "images/all-img/Catholic-Priest.png"
            }
            alt="Priest"
            width="70"
            height="70"
            onError={(e) =>
              (e.target.src = "images/all-img/Catholic-Priest.png")
            }
          />
        ),
      },
      {
        Header: "Name of the Priest",
        accessor: "name",
        Cell: (row) => row?.value || "-",
      },
      {
        Header: "Date of Ordination",
        accessor: "date_of_ordination",
        Cell: (row) =>
          row?.value ? moment(row?.value).format("DD-MMM-YYYY") : "-",
      },
      {
        Header: "Years",
        accessor: "years",
        Cell: (row) => row?.value || "-",
      },
      {
        Header: "Place",
        accessor: "place",
        Cell: (row) => row?.value || "-",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state,
    setGlobalFilter,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    pageCount,
    canPreviousPage,
    canNextPage,
    pageOptions,
  } = useTable(
    {
      columns,
      data: priests,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  const handleChange = (event) => {
    const value = event.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value || "");
  };

  const renderAccordionContent = (data) => (
    <table className="table table-striped table-bordered table-hover">
      <thead className="thead-dark">
        <tr>
          <th scope="col">S.No</th>
          <th scope="col">Name</th>
          <th scope="col">Date of Ordination</th>
          {data?.some((item) => item?.category_id === 12) && (
            <React.Fragment>
              <th scope="col">Years</th>
              <th scope="col">Place</th>
            </React.Fragment>
          )}
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item?.name || "-"}</td>
            <td>
              {item?.date_of_ordination
                ? moment(item?.date_of_ordination).format("DD-MMM-YYYY")
                : "-"}
            </td>
            {item?.category_id === 12 && (
              <React.Fragment>
                <td>{item?.years || "-"}</td>
                <td>{item?.residence || "-"}</td>
              </React.Fragment>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Priests of the Kurnool Diocese</h3>

      {loading ? (
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        </div>
      ) : (
        <>
          <div className="d-flex flex-row mb-3">
            <input
              type="text"
              value={filterInput}
              onChange={handleChange}
              className="form-control"
              placeholder="Search Priests..."
            />
            <button
              className="btn btn-secondary ml-2"
              onClick={() => setGlobalFilter(filterInput)}
            >
              Search
            </button>
          </div>
          {priests.length === 0 ? (
            <div className="text-center">No data available</div>
          ) : (
            <>
              <table
                {...getTableProps()}
                className="table table-striped table-bordered table-hover"
              >
                <thead className="thead-dark">
                  {headerGroups?.map((headerGroup) => (
                    <tr {...headerGroup?.getHeaderGroupProps()}>
                      {headerGroup?.headers?.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page?.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="pagination d-flex justify-content-between">
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                  >
                    {"<<"}
                  </button>{" "}
                  <button
                    className="btn btn-secondary"
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                  >
                    {"<"}
                  </button>{" "}
                  <button
                    className="btn btn-secondary"
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                  >
                    {">"}
                  </button>{" "}
                  <button
                    className="btn btn-secondary"
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                  >
                    {">>"}
                  </button>{" "}
                  <span>
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                </div>
                <div>
                  <span className="mr-2">
                    Show{" "}
                    <select
                      value={pageSize}
                      onChange={(e) => {
                        setPageSize(Number(e.target.value));
                      }}
                    >
                      {[10, 20, 30, 40, 50]?.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>{" "}
                    entries
                  </span>{" "}
                </div>
              </div>
            </>
          )}

          <div className="accordion mt-5" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link btn-block text-left text-decoration-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <i className="fa fa-plus"></i> Retired Priest
                  </button>
                </h2>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  {renderAccordionContent(category11)}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link btn-block text-left collapsed text-decoration-none"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <i className="fa fa-plus"></i> Abroad Priest
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  {renderAccordionContent(category12)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Priests;
