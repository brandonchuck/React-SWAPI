import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import PaginateBar from "./PaginateBar";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfPages, setNumOfPages] = useState();

  let url = `https://swapi.dev/api/people/?search=${characterName}&?page=${pageNumber}`;

  useEffect(() => {
    fetchCharacters();
  }, [pageNumber]);

  function updatePageNumber(pageNum) {
    setPageNumber(pageNum);
  }

  async function handleNextPrevClick(buttonName) {
    let currentPage = await axios.get(url); // res from current page

    if (buttonName === "Prev") {
      let prevPageURL = currentPage.data.previous; // url for prev page
      let prev = await axios.get(prevPageURL);
      setCharacterList(prev.data.results);
      setPageNumber(pageNumber - 1);
    } else {
      let nextPageURL = currentPage.data.next; // url for next page
      let next = await axios.get(nextPageURL);
      setCharacterList(next.data.results);
      setPageNumber(pageNumber + 1); // prepares for press of the "next" button
    }
  }

  // searching
  async function handleSearch(e) {
    e.preventDefault();
    getCharacters(url);
  }

  // onload
  async function fetchCharacters() {
    getCharacters(url);
  }

  // for both searching and pagination
  async function getCharacters(url) {
    console.log(url);

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
