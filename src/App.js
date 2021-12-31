import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchCharacters();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await axios.get(
      `https://swapi.dev/api/people/?search=${characterName}`
    );
    setCharacterList(res.data.results);
  }

  async function fetchCharacters() {
    let res = await axios.get(
      `https://swapi.dev/api/people/?page=${pageNumber}`
    );

    for (const character of res.data.results) {
      // findHomeworld(character);
      let homeworld = await axios.get(character.homeworld);
      character["homeworld"] = homeworld.data.name;

      // findSpecies(character);
      if (character.species.length !== 0) {
        let species = await axios.get(character.species[0]);
        character["species"] = species.data.name;
      } else {
        character["species"] = "Unknown";
      }
    }
    setCharacterList(res.data.results);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>STAR WARS API</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group row">
              <input
                type="text"
                onChange={(e) => setCharacterName(e.target.value)}
                value={characterName}
              />
              <input type="submit" />
            </div>
          </form>
          <br />
          <CharacterTable
            characterList={characterList}
            pageNumber={pageNumber}
          />
          <PaginateBar pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </div>
      </div>
    </div>
  );
}

export default App;
