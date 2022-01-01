const PaginateBar = ({ updatePageNumber }) => {
  const pages = [];
  for (let i = 1; i < 10; i++) {
    pages.push(i);
  }

  function handlePageClick(pageNum) {
    updatePageNumber(pageNum);
  }

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li className="page-item" key={page}>
              <button
                className="page-link"
                onClick={(e) => handlePageClick(e.target.value)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginateBar;
