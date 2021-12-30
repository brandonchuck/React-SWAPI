const PaginateBar = ({ pageNumber, setPageNumber }) => {
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
        <li className="page-item">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            4
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            5
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            6
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            7
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            8
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            9
          </a>
        </li>
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
