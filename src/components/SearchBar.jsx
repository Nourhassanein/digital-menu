function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-md-8">
        <div className="search-wrapper">
          <i className="bi bi-search search-icon"></i>
          <input
            type="text"
            className="form-control form-control-lg bloom-search"
            placeholder="Search dishes, drinks, salads, or desserts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;