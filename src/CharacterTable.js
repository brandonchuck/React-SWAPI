import axios from "axios";

const CharacterTable = ({ characterList }) => {
  // async function fetchHomeworld(homeworld) {
  //   let res = await axios.get(homeworld).catch((err) => console.log(err));
  //   return res;
  // }

  async function fetchHomeworld(homeworld) {
    let res = await axios.get(homeworld);
    return res.data.name;
  }

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
            <th>Homeworld Test</th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {characterList.map((character) => {
            // let home = "http://swapi.dev/api/planets/1/";
            return (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.birth_year}</td>
                <td>{character.height}</td>
                <td>{character.mass}</td>
                <td>{character.homeworld}</td>
                <td>{fetchHomeworld(home)}</td>
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
