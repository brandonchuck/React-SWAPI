import "./App.css";
import { useEffect, useState } from "react";
import CharacterTable from "./CharacterTable";
import axios from "axios";

function App() {
  const [characterName, setCharacterName] = useState("");
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    async function fetchCharacters() {
      let res = await axios.get(`https://swapi.dev/api/people/?page=`);

      for (const character of res.data.results) {
        character["id"] = Math.floor(Math.random() * 10000);

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
    fetchCharacters();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let res = await axios.get(
      `https://swapi.dev/api/people/?search=${characterName}`
    );
    setCharacterList(res.data.results);
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
