import React from "react";

const ListDetailSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="input-group w-100 mb-3 px-2 overflow-auto">
      <input
        type="text"
        className="form-control bg-light"
        placeholder="Buscar trabajos..."
        aria-label="Search"
        autoComplete="off"
        aria-describedby="basic-addon2"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" type="button">
          <i className="fas fa-search fa-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default ListDetailSearch;
