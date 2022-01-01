import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // const totalCharacters = 82;
  // const charactersPerPage = 10;
  // const numOfButtons = Math.ceil(totalCharacters / charactersPerPage);

  let searchCharacterURL = `https://swapi.dev/api/people/?search=${characterName}`;

  let peopleURL = `https://swapi.dev/api/people/?page=${pageNumber}`;

  useEffect(() => {
    fetchCharacters();
  }, []);

  function updatePageNumber(pageNum) {
    setPageNumber(pageNum);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    let res = await axios.get(searchCharacterURL);

    for (const character of res.data.results) {
      let homeworld = await axios.get(character.homeworld);
      character["homeworld"] = homeworld.data.name;

      if (character.species.length !== 0) {
        let species = await axios.get(character.species[0]);
        character["species"] = species.data.name;
      } else {
        character["species"] = "Unknown";
      }
    }
    setCharacterList(res.data.results);
  }

  async function fetchCharacters() {
    let res = await axios.get(peopleURL);

    for (const character of res.data.results) {
      let homeworld = await axios.get(character.homeworld);
      character["homeworld"] = homeworld.data.name;

      if (character.species.length !== 0) {
        let species = await axios.get(character.species[0]);
        character["species"] = species.data.name;
      } else {
        character["species"] = "Unknown";
      }
    }
    setCharacterList(res.data.results);
  }

  // async function formatResults(results) {
  //   for (const character of results) {
  //     let homeworld = await axios.get(character.homeworld);
  //     character["homeworld"] = homeworld.data.name;

  //     if (character.species.length !== 0) {
  //       let species = await axios.get(character.species[0]);
  //       character["species"] = species.data.name;
  //     } else {
  //       character["species"] = "Unknown";
  //     }
  //   }
  // }

  // function handleNextClick() {}

  // function handlePrevClick() {}

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
        </div>
        <br />
        <CharacterTable characterList={characterList} />
        <PaginateBar updatePageNumber={updatePageNumber} />
      </div>
    </div>
  );
}

export default App;
