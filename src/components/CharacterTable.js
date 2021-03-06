const CharacterTable = ({ characterList }) => {
  return (
    <div className="table-container">
      <table className="table table-responsive table-dark table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {characterList.map((character, index) => {
            return (
              <tr key={character.name}>
                <td>{index + 1}</td>
                <td>{character.name}</td>
                <td>{character.birth_year}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.homeworld}</td>
                <td>{character.species}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterTable;
