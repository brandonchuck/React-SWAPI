import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState("");

  useEffect(() => {
    fetchCharacters();
  }, []);

  function updatePageNumber(pageNum) {
    setPageNumber(Number(pageNum));
  }

  async function paginate(pageNum) {
    let url;
    if (characterName === "") {
      url = `https://swapi.dev/api/people/?page=${pageNum}`;
    } else {
      url = `https://swapi.dev/api/people/?search=${characterName}&page=${pageNum}`;
    }
    const res = await axios.get(url);
    getCharacters(res.data.results);
  }

  async function handleSearch(e) {
    e.preventDefault();

    const url = `https://swapi.dev/api/people/?search=${characterName}`;
    const res = await axios.get(url);
    setNumOfPages(Math.ceil(res.data.count / 10));
    getCharacters(res.data.results);
  }

  async function fetchCharacters() {
    const url = `https://swapi.dev/api/people/?page=${pageNumber}`;
    const res = await axios.get(url);
    setNumOfPages(Math.ceil(res.data.count / 10));
    getCharacters(res.data.results);
  }

  async function handleNextPrevClick(buttonName) {
    let url;
    if (characterName === "") {
      url = `https://swapi.dev/api/people/?page=${pageNumber}`;
    } else {
      url = `https://swapi.dev/api/people/?search=${characterName}&page=${pageNumber}`;
    }
    console.log("Current Page: " + url);

    let currentPage = await axios.get(url);
    console.log("Next page: " + currentPage.data.next);
    console.log("Prev page: " + currentPage.data.previous);

    if (buttonName === "Next") {
      if (currentPage.data.next !== null) {
        const nextPage = await axios.get(currentPage.data.next);
        getCharacters(nextPage.data.results);
        setPageNumber(pageNumber + 1);
      } else {
        return;
      }
    }

    if (buttonName === "Prev") {
      if (currentPage.data.previous !== null) {
        const prevPage = await axios.get(currentPage.data.previous);
        getCharacters(prevPage.data.results);
        setPageNumber(pageNumber - 1);
      } else {
        return;
      }
    }
  }

  async function getCharacters(characters) {
    let characterIndex = 1;
    for (const character of characters) {
      character["characterIndex"] = characterIndex;
      const homeworld = await axios.get(character.homeworld);
      character["homeworld"] = homeworld.data.name;

      if (character.species.length > 0) {
        const species = await axios.get(character.species[0]);
        character["species"] = species.data.name;
      } else {
        character["species"] = "Human";
      }
      characterIndex++;
    }
    setCharacterList(characters);
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
          numOfPages={numOfPages}
          paginate={paginate}
          handleNextPrevClick={handleNextPrevClick}
          updatePageNumber={updatePageNumber}
        />
      </div>
    </div>
  );
}

export default App;
