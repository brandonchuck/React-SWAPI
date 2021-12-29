import react from "react";

const CharacterTable = ({ character }) => {
  // console.log(character.data);

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
