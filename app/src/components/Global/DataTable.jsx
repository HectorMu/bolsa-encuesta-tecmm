import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useMemo } from "react";
import { DebounceInput } from "react-debounce-input";
import ReactPaginate from "react-paginate";
// /**
//  * @param {String} title The table title
//  * @param {Array}   data JSON array with all the table data
//  * @param {Array}  buttons JSON array with all the buttons actions, text and styles
//  * @param {Boolean} actions Boolean, determines if table actions are shown or not
//  * @param {Object} filtersConfig Object that determines the filters to show. Receives the key and text to display Example: { name: "Name"}
//  * @param {String} actionsText Text to display in actions final table column head
//  * @param {String} searchText Text to display on search input placeholder
//  * @param {String} firstColumnKey Is the table key name for each row, example: folium, number, id, etc, it depends on your json array, default value = "id"
//  * @param {Object} renameHeaders Object with the key of the headers and the value to replace. Example: { id: "Folium"}
//  * @param {String} emptyDataText Text to display where there isnt data in the table
//  * @param {Array} hideColumns Array with the name of the json columns you want to hide in table. Example: ["name","id","foreign_key"]
//  *@param {Function} refreshCallback Function to callback to refresh the table, you can provide your fetching function: default: null
//  */

// const actionElement = {
//   element: "id",
//   className: "btn btn-link",
//   action: (o) => window.alert(`Default action ${o}`),
// };

const DataTable = ({
  title = "Default title",
  firstColumnKey = "id",
  data = [],
  buttons = [
    {
      key: "default1",
      text: "Default button",
      style: "btn btn-secondary mx-1 btn-sm",
      fwicon: "fas fa-question",
      click: (o) => {
        window.alert(`Default action ${o}`);
      },
    },
  ],
  CustomButtons = null,
  actions = false,
  filtersConfig = null,
  actionsText = "Actions",
  searchText = "Searching by",
  renameHeaders = null,
  emptyDataText = "No data",
  hideColumns = [],
  refreshCallback = null,
  actionElement = null,
  exportable = true,
  filters = true,
  withHeader = true,
}) => {
  const [initialData, setInitialData] = useState([]);
  const [initialFilter, setInitialFilter] = useState(firstColumnKey);
  const [selectedCol, setSelectedCol] = useState("");
  const [order, setOrder] = useState("ASC");
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [selected, setSelected] = useState(0);

  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const [search, setSearch] = useState("");

  let PageSize = 30;

  //const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const endOffset = itemOffset + PageSize;

    if (search !== "") {
      if (search === "") return currentTableData;

      if (selectedFilter === initialFilter) {
        const results = data.filter(
          (d) => d[initialFilter].toString() === search
        );
        if (results.length > 0) return results;
      }

      const results = data.filter((d) =>
        d[selectedFilter.toLowerCase()]
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase().trim())
      );

      if (results.length > 0) return results;

      return [];
    }

    if (selectedCol === "")
      return data.length > 0 && data.slice(itemOffset, endOffset);

    const selectedColSplitted = selectedCol.split(" ")[0];

    if (order === "ASC") {
      setOrder("DESC");

      if (selectedColSplitted === firstColumnKey) {
        return (
          data.length > 0 && [
            ...data
              .slice(itemOffset, endOffset)
              .sort(
                (fe, se) => se[selectedColSplitted] - fe[selectedColSplitted]
              ),
          ]
        );
      }
      return (
        data.length > 0 && [
          ...data
            .slice(itemOffset, endOffset)
            .sort((fe, se) =>
              se[selectedColSplitted] - fe[selectedColSplitted] ? 1 : -1
            ),
        ]
      );
    } else {
      setOrder("ASC");
      if (selectedColSplitted === firstColumnKey) {
        return (
          data.length > 0 && [
            ...data
              .slice(itemOffset, endOffset)
              .sort(
                (fe, se) => fe[selectedColSplitted] - se[selectedColSplitted]
              ),
          ]
        );
      }

      return data.length > 0 && data.slice(itemOffset, endOffset);
    }
  }, [search, selectedFilter, selectedCol, itemOffset, data]);

  useEffect(() => {
    if (initialData.length > 0) {
      setInitialFilter(Object.keys(initialData[0])[0]);
    }
  }, [initialData]);

  useEffect(() => {
    setPageCount(Math.ceil(data.length / PageSize));
    setInitialData(data);
  }, [data]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * PageSize) % data.length;
    setItemOffset(newOffset);
    setSelected(event.selected);
  };

  return (
    <div className={`card ${withHeader ? "shadow-lg" : ""} mb-4 border-none`}>
      {initialData.length !== 0 && withHeader && (
        <div className="card-header py-3 d-flex justify-content-between d-sm-flex flex-column flex-lg-row flex-md-row flex-xl-row">
          <h6 className="m-0 font-weight-bold text-primary text-center">
            {title}
          </h6>
          <div className="d-flex table-controls  mt-3 mt-lg-0 mt-md-0 mt-xl-0">
            {refreshCallback !== null ? (
              <button
                onClick={async () => refreshCallback()}
                type="button"
                className="btn btn-sm"
              >
                <i className="fas fa-sync text-primary"></i>
              </button>
            ) : null}

            <div className="btn-group dropleft">
              {exportable && (
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="btn btn-sm mr-2 text-primary"
                  table={`dataTable${title.replace(" ", "-")}`}
                  filename={title}
                  sheet="tablexls"
                  buttonText={<i className="far fa-file-excel"></i>}
                />
              )}

              {filters && (
                <button
                  type="button"
                  className="btn btn-sm"
                  data-toggle="dropdown"
                  id={`filtersDropdown${title}`}
                  aria-expanded="false"
                >
                  <i className="fas fa-sliders-h text-primary"></i>
                </button>
              )}

              <div
                className="dropdown-menu shadow px-2 animated--fade-in"
                aria-labelledby={`filtersDropdown${title}`}
              >
                {initialData !== undefined && initialData.length > 0
                  ? filtersConfig !== null
                    ? Object.entries(filtersConfig).map(([key, value]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setSelectedFilter(key)}
                          className={`dropdown-item rounded ${
                            selectedFilter === key
                              ? `text-primary font-weight-bolder`
                              : `${selectedFilter === "None" ? "" : ""}`
                          }${hideColumns.includes(key) ? `d-none` : ``} `}
                        >
                          {value}
                        </button>
                      ))
                    : Object.keys(initialData[0]).map((key) =>
                        renameHeaders !== null &&
                        Object.keys(renameHeaders).includes(key) ? (
                          <button
                            key={key}
                            onClick={() => setSelectedFilter(key)}
                            type="button"
                            className={`dropdown-item rounded ${
                              selectedFilter === key
                                ? `text-primary fw-bold`
                                : `${selectedFilter === "None" ? "" : ""}`
                            }${hideColumns.includes(key) ? `d-none` : ``} `}
                          >
                            {renameHeaders[key]}
                          </button>
                        ) : (
                          <button
                            key={key}
                            onClick={() => setSelectedFilter(key)}
                            type="button"
                            className={`dropdown-item rounded ${
                              selectedFilter === key
                                ? `text-primary fw-bold`
                                : `${selectedFilter === "None" ? "" : ""}`
                            }${hideColumns.includes(key) ? `d-none` : ``} `}
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </button>
                        )
                      )
                  : null}
              </div>
            </div>
            <div className="input-group">
              <DebounceInput
                type="text"
                debounceTimeout={300}
                className="form-control border-0 small"
                placeholder={`${searchText} ${
                  renameHeaders !== null &&
                  Object.keys(renameHeaders).includes(selectedFilter)
                    ? renameHeaders[selectedFilter].toLowerCase()
                    : selectedFilter
                }`}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-primary btn-sm" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="card-body">
        {refreshCallback !== null && !withHeader && (
          <div className="d-flex justify-content-end mb-2">
            <button
              onClick={async () => refreshCallback()}
              type="button"
              className="btn btn-sm"
            >
              <i className="fas fa-sync text-primary"></i>
            </button>
          </div>
        )}
        <div className="table-responsive">
          {search === "" ? (
            <div className="d-flex justify-content-center">
              {pageCount > 1 && (
                <ReactPaginate
                  key={"P1"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  activeClassName={"active"}
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={1}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  forcePage={selected}
                />
              )}
            </div>
          ) : (
            <>
              {currentTableData.length > 0 ? (
                <p className="text-primary font-weight-bold p-0 ">
                  {currentTableData.length} resultados para '{search}', buscando
                  por{" "}
                  {Object.keys(renameHeaders).includes(selectedFilter)
                    ? renameHeaders[selectedFilter].toLowerCase()
                    : selectedFilter}
                </p>
              ) : null}
            </>
          )}

          <table
            className="table table-hover text-center"
            id={`dataTable${title.replace(" ", "-")}`}
            width="100%"
            cellSpacing={0}
          >
            <thead>
              {data && data.length > 0 ? (
                <tr key={data[0]?.id}>
                  {Object.keys(data[0]).map((e, i) =>
                    renameHeaders !== null &&
                    Object.keys(renameHeaders).includes(e) ? (
                      <th
                        key={e + i}
                        className={`${
                          selectedFilter.toLowerCase() === e
                            ? `text-primary text-uppercase`
                            : ``
                        }${
                          hideColumns.length > 0 && hideColumns.includes(e)
                            ? `d-none`
                            : ``
                        }`}
                      >
                        <div className="d-flex">
                          {renameHeaders[e]}{" "}
                          <button
                            onClick={() =>
                              setSelectedCol(e + " " + new Date().getTime())
                            }
                            className="btn  btn-sm btn-link mx-1 y border-0 text-primary px-1 py-0"
                          >
                            {selectedCol !== "" &&
                            order === "ASC" &&
                            selectedCol.split(" ")[0] === e ? (
                              <i className="fas fa-sort-up "></i>
                            ) : (
                              <i className="fas fa-sort-down "></i>
                            )}
                          </button>{" "}
                        </div>
                      </th>
                    ) : (
                      <th
                        key={e + i}
                        className={`${
                          selectedFilter.toLowerCase() === e
                            ? `text-primary text-uppercase`
                            : ``
                        }${
                          hideColumns.length > 0 && hideColumns.includes(e)
                            ? `d-none`
                            : ``
                        }`}
                      >
                        <div className="d-flex">
                          {e.charAt(0).toUpperCase() + e.slice(1)}{" "}
                          <button
                            onClick={() =>
                              setSelectedCol(e + " " + new Date().getTime())
                            }
                            className="btn  btn-sm btn-link mx-1 y border-0 text-primary px-1 py-0"
                          >
                            {selectedCol !== "" &&
                            order === "ASC" &&
                            selectedCol.split(" ")[0] === e ? (
                              <i className="fas fa-sort-up "></i>
                            ) : (
                              <i className="fas fa-sort-down "></i>
                            )}
                          </button>{" "}
                        </div>
                      </th>
                    )
                  )}
                  {actions === true ? <th>{actionsText}</th> : null}
                </tr>
              ) : (
                <tr>
                  <th className="d-flex flex-column justify-content-center align-items-center">
                    <h5 className="text-primary font-weight-bold">
                      {emptyDataText}
                    </h5>
                    <button
                      onClick={refreshCallback}
                      className="btn btn-outline-primary"
                    >
                      Recargar <i className="fas fa-sync "></i>
                    </button>
                  </th>
                </tr>
              )}
            </thead>

            <tbody>
              {search !== "" && currentTableData.length === 0 && (
                <tr>
                  <td colSpan={"100%"}>
                    <h5 className="text-center text-primary w-100 py-4 shadow">
                      No se encontraron resultados para: '{search}' al buscar
                      por{" "}
                      {Object.keys(renameHeaders).includes(selectedFilter)
                        ? renameHeaders[selectedFilter].toLowerCase()
                        : selectedFilter}
                    </h5>
                  </td>
                </tr>
              )}

              {currentTableData.length > 0
                ? currentTableData.map((d, i) => (
                    <tr key={i}>
                      {Object.entries(d).map(([k, e], i) => (
                        <td
                          className={`${
                            hideColumns.length > 0 && hideColumns.includes(k)
                              ? `d-none `
                              : ``
                          }`}
                          key={k + i}
                        >
                          {typeof e === "object" &&
                          Object.entries(e).length > 0 ? (
                            <>
                              <table className="table m-0 p-0 text-center ">
                                <thead>
                                  <tr>
                                    {Object.keys(e).map((k, i) => (
                                      <th key={k + i}>{k}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    {Object.values(e).map((v) => (
                                      <td key={v + k + i}>{v}</td>
                                    ))}
                                  </tr>
                                </tbody>
                              </table>
                            </>
                          ) : actionElement !== null &&
                            actionElement.element === k ? (
                            <button
                              onClick={() => actionElement.action(d)}
                              className={actionElement.className}
                            >
                              {e}
                            </button>
                          ) : (
                            e
                          )}
                        </td>
                      ))}
                      {actions === true && (
                        <td className="d-flex d-sm-flex flex-sm-column flex-column flex-lg-row flex-md-row flex-xl-row">
                          {CustomButtons !== null ? (
                            <CustomButtons
                              object={d}
                              refreshCallback={refreshCallback}
                            />
                          ) : (
                            buttons.map((b) => (
                              <button
                                key={b.key}
                                className={b.style}
                                onClick={() => b.click(d)}
                              >
                                <i className={b.fwicon}></i>{" "}
                                <span className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
                                  {b.text}
                                </span>
                              </button>
                            ))
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                : null}
              {search === "" && currentTableData.length === 0 ? (
                <tr>
                  <td>{emptyDataText}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {search === "" && pageCount > 1 && (
            <div className="d-flex justify-content-center">
              <ReactPaginate
                key={"P2"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                activeClassName={"active"}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                forcePage={selected}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
