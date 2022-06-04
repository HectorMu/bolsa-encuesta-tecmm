import { useState, useEffect } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Pagination from "./Pagination";
import { useMemo } from "react";
import { DebounceInput } from "react-debounce-input";

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
}) => {
  const [initialData, setInitialData] = useState([]);
  const [initialFilter, setInitialFilter] = useState(firstColumnKey);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const [search, setSearch] = useState("");

  let PageSize = 30;

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.length > 0 && data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const currentSearchResults = useMemo(() => {
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
  }, [search, selectedFilter]);

  useEffect(() => {
    if (initialData.length > 0) {
      setInitialFilter(Object.keys(initialData[0])[0]);
    }
  }, [initialData]);

  useEffect(() => {
    setInitialData(data);
  }, [data]);

  return (
    <div className="card shadow-lg mb-4 border-none ">
      <div className="card-header py-3 d-flex justify-content-between d-sm-flex flex-column flex-lg-row flex-md-row flex-xl-row">
        <h6 className="m-0 font-weight-bold text-primary text-center">
          {title}
        </h6>
        <div className="d-flex  mt-3 mt-lg-0 mt-md-0 mt-xl-0">
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
      <div className="card-body">
        <div className="table-responsive">
          {search === "" ? (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={initialData.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          ) : (
            <>
              {currentSearchResults.length > 0 ? (
                <p className="text-primary font-weight-bold p-0 ">
                  {currentSearchResults.length} resultados para '{search}',{" "}
                  buscando por{" "}
                  {Object.keys(renameHeaders).includes(selectedFilter)
                    ? renameHeaders[selectedFilter].toLowerCase()
                    : selectedFilter}
                </p>
              ) : null}
            </>
          )}

          <table
            className="table table-hover"
            id={`dataTable${title.replace(" ", "-")}`}
            width="100%"
            cellSpacing={0}
          >
            <thead>
              {currentTableData !== undefined &&
              Array.isArray(currentTableData) &&
              currentTableData.length > 0 ? (
                <tr key={currentTableData[0].id}>
                  {Object.keys(currentTableData[0]).map((e, i) =>
                    renameHeaders !== null &&
                    Object.keys(renameHeaders).includes(e) ? (
                      <th
                        key={e + i}
                        className={`${
                          selectedFilter.toLowerCase() === e
                            ? `text-primary text-uppercase `
                            : ``
                        }${
                          hideColumns.length > 0 && hideColumns.includes(e)
                            ? `d-none`
                            : ``
                        }`}
                      >
                        <div className="d-flex">{renameHeaders[e]} </div>
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
                        </div>
                      </th>
                    )
                  )}
                  {actions === true ? <th>{actionsText}</th> : null}
                </tr>
              ) : (
                <tr>
                  <th>{emptyDataText}</th>
                </tr>
              )}
            </thead>

            <tbody>
              {search !== "" && currentSearchResults.length === 0 && (
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
              {search !== "" && currentSearchResults.length > 0
                ? currentSearchResults.map((d, i) => (
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

              {currentTableData.length > 0 && search === ""
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
              {currentTableData.length < 0 && !currentSearchResults ? (
                <tr>
                  <td>{emptyDataText}</td>
                </tr>
              ) : null}
            </tbody>
          </table>
          {search === "" && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={initialData.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
