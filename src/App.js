import "./App.css";
import { useState } from "react";
import CharacterTable from "./CharacterTable";

const axios = require("axios");

function App() {
  const [character, setCharacter] = useState("");
  const [characterName, setCharacterName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get(`https://swapi.dev/api/people/?search=${characterName}`)
      .then((res) => {
        setCharacter(res);
        console.log(res.data.results[0]);
      });
  };

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
      <CharacterTable character={character} />
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
