import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./components/CharacterTable";
import PaginateBar from "./components/PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState("");

  const BASE_URL = "https://swapi.dev/api/people/";

  useEffect(() => {
    fetchCharacters();
  }, [pageNumber]);

  async function paginate(pageNum) {
    let url;
    if (characterName === "") {
      url = `${BASE_URL}?page=${pageNum}`;
    } else {
      url = `${BASE_URL}?search=${characterName}&page=${pageNum}`;
    }
    const { data } = await axios.get(url);
    getCharacters(data.results);
  }

  async function handleSearch(e) {
    e.preventDefault();
    setPageNumber(1);
    const url = `${BASE_URL}?search=${characterName}`;
    const { data } = await axios.get(url);
    setPageCount(Math.ceil(data.count / 10));
    getCharacters(data.results);
  }

  async function fetchCharacters() {
    let url;
    if (characterName === "") {
      url = `${BASE_URL}?page=${pageNumber}`;
    } else {
      url = `${BASE_URL}?search=${characterName}&page=${pageNumber}`;
    }
    const { data } = await axios.get(url);
    setPageCount(Math.ceil(data.count / 10));
    getCharacters(data.results);
  }

  async function handleNextPrevClick(buttonName) {
    if (buttonName === "Next" && pageNumber < pageCount) {
      setPageNumber(pageNumber + 1);
    }

    if (buttonName === "Prev" && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  async function getCharacters(characters) {
    for (const character of characters) {
      await getHomeworld(character);
      await getSpecies(character);
    }
    setCharacterList(characters);
  }

  async function getHomeworld(character) {
    const { data } = await axios.get(character.homeworld);
    character.homeworld = data.name;
  }

  async function getSpecies(character) {
    if (!character.species.length) {
      character.species = "Human";
    } else {
      const { data } = await axios.get(character.species[0]);
      character.species = data.name;
    }
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
          pageCount={pageCount}
          paginate={paginate}
          handleNextPrevClick={handleNextPrevClick}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}

export default App;
