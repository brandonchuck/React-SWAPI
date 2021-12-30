import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import axios from "axios";

function App() {
  // const [character, setCharacter] = useState({});
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      let res = await axios.get(`https://swapi.dev/api/people/`);
      res.data.results.forEach((character) => {
        character["id"] = Math.floor(Math.random() * 1000);
      });
      setCharacterList(res.data.results);
    }
    fetchCharacters();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await axios.get(
      `https://swapi.dev/api/people/?search=${characterName}`
    );
    setCharacterList([...characterList, res]);
  }

  return (
    <div className="App">
      <h1>STAR WARS API</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setCharacterName(e.target.value)}
          value={characterName}
        />
        <input type="submit" />
      </form>
      <CharacterTable characterList={characterList} />
    </div>
  );
}

export default App;

// Table requirements:
// name
// birth date
// height
// mass
// homeworld
// species

// **** Searching: ****
// get character object w/properties
// send character to table to render properties

// **** useEffect(): ****
// get list of all characters
// store them in characterList
// send characterList to table
