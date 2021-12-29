import axios from "axios";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";

const CharacterTable = ({ character }) => {
  // console.log(character.data);

  const [list, setList] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  // useEffect(() => {
  //   axios.get()
  // })

  return (
    <div className="table-container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
