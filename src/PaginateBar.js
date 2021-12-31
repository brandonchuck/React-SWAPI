const PaginateBar = ({ characterList, pageNumber, setPageNumber }) => {
  function handleNextClick() {
    setPageNumber(pageNumber++);
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
        {characterList.map((index) => {
          let page = index.toString();

          return (
            <li className="page-item">
              <a className="page-link" href="#">
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={handleNextClick}
          >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginateBar;
