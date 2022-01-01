const PaginateBar = ({ updatePageNumber, handleNextPrevClick }) => {
  const pages = [];
  for (let i = 1; i < 10; i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button
            className="page-link"
            onClick={(e) => handleNextPrevClick(e.target.textContent)}
          >
            Prev
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li className="page-item" key={page}>
              <button
                className="page-link"
                onClick={(e) => updatePageNumber(e.target.textContent)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="page-link"
            onClick={(e) => handleNextPrevClick(e.target.textContent)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginateBar;
