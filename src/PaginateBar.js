const PaginateBar = ({
  numOfPages,
  updatePageNumber,
  paginate,
  handleNextPrevClick,
}) => {
  const pages = [];
  for (let i = 1; i <= numOfPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination-bar">
      <ul className="pagination pagination-lg justify-content-center">
        <li className="page-item">
          <button
            className="paginate-control page-link"
            onClick={(e) => handleNextPrevClick(e.target.textContent)}
          >
            Prev
          </button>
        </li>
        {pages.map((page) => {
          page.toString();
          return (
            <li className="page-item" key={page}>
              <button
                className="paginate-button page-link"
                onClick={(e) => {
                  updatePageNumber(e.target.textContent);
                  paginate(e.target.textContent);
                  e.target.classList.toggle("active");
                }}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <button
            className="paginate-control page-link"
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
