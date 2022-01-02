import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  let searchCharacterURL = `https://swapi.dev/api/people/?search=${characterName}`;
  let peopleURL = `https://swapi.dev/api/people/?page=${pageNumber}`;

  useEffect(() => {
    fetchCharacters();
  }, [pageNumber]);

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
        character["species"] = "unknown";
      }
    }
    setCharacterList(res.data.results);
  }

  function handleNextPrevClick(buttonName) {
    buttonName === "Prev"
      ? setPageNumber(pageNumber - 1)
      : setPageNumber(pageNumber + 1);
  }

  return (
    <div className="App row justify-content-center">
      <div className="container row align-items-center">
        <h1>STAR WARS API</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group row justify-content-center">
              <input
                className=" search-bar col-sm-5 "
                type="text"
                onChange={(e) => setCharacterName(e.target.value)}
                value={characterName}
              />
              <button className="search-button col-sm-3" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <CharacterTable characterList={characterList} />
        <PaginateBar
          pageNumber={pageNumber}
          handleNextPrevClick={handleNextPrevClick}
          updatePageNumber={updatePageNumber}
        />
      </div>
    </div>
  );
}

export default App;
