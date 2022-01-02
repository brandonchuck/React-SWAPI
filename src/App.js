import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState(null);

  // const numOfPages = Math.ceil(res.data.count / 10)

  let searchCharacterURL = `https://swapi.dev/api/people/?search=${characterName}`;
  let peopleURL = `https://swapi.dev/api/people/?page=${pageNumber}`;

  useEffect(() => {
    fetchCharacters();
  }, [pageNumber]);

  function updatePageNumber(pageNum) {
    setPageNumber(pageNum);
  }

  function handleNextPrevClick(buttonName) {
    buttonName === "Prev"
      ? setPageNumber(pageNumber - 1)
      : setPageNumber(pageNumber + 1);
  }

  async function handleSearch(e) {
    e.preventDefault();
    getCharacters(searchCharacterURL);
  }

  async function fetchCharacters() {
    getCharacters(peopleURL);
  }

  async function getCharacters(url) {
    let res = await axios.get(url);

    setNumOfPages(Math.ceil(res.data.count / 10)); // this is causing number of pages to be reset

    let iterator = 1;
    for (let character of res.data.results) {
      character["characterIndex"] = iterator;

      let homeworld = await axios.get(character.homeworld);
      character["homeworld"] = homeworld.data.name;

      if (character.species.length !== 0) {
        let species = await axios.get(character.species[0]);
        character["species"] = species.data.name;
      } else {
        character["species"] = "unknown";
      }
      iterator++;
    }
    setCharacterList(res.data.results);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>STAR WARS API</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleSearch}>
            <div className="form-group row justify-content-center">
              <input
                className=" search-input col-sm-4"
                type="text"
                onChange={(e) => setCharacterName(e.target.value)}
                n
                value={characterName}
              />
              <button className="search-button col-sm-2" type="submit">
                Search
              </button>
            </div>
          </form>
        </div>
        <CharacterTable characterList={characterList} />
        <PaginateBar
          numOfPages={numOfPages}
          handleNextPrevClick={handleNextPrevClick}
          updatePageNumber={updatePageNumber}
        />
      </div>
    </div>
  );
}

export default App;
