import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../../components/API/Api";
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${ApiUrl}/get/kurnooldiocese/preist/10`
      );
      setPriests(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
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
          row?.value
            ? moment(row?.value).format("DD-MMM-YYYY")
            : "-",
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

  return (
    <div className="container mt-3">
      <h3 className="text-center mb-4">Priests of the Kurnool Diocese</h3>
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
      <table
        {...getTableProps()}
        className="table table-striped table-bordered table-hover"
      >
        <thead className="thead-dark">
          {headerGroups?.map((headerGroup) => (
            <tr {...headerGroup?.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
    </div>
  );
};

export default Priests;
