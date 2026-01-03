import { useState, useEffect, useMemo } from "react";
import Card from "./components/card";
import "./App.css";
function App() {
  // fetch lista di politici
  const [politicians, setPoliticians] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((res) => setPoliticians(res))
      .catch((err) => console.error(err));
  }, []);

  // creazione di array di tutte le posizioni presenti
  const PolPositions = politicians?.reduce((acc, curr) => {
    if (!acc.includes(curr.position)) {
      acc.push(curr.position);
    }
    return acc;
  }, []);

  // filtro politico
  const [inputTxt, setInputTxt] = useState("");
  const [selected, setSelected] = useState("Default");

  const filteredList = useMemo(() => {
    return politicians.filter((p) => {
      const validInput = p.name.toLowerCase().includes(inputTxt.toLowerCase());
      const validBio = p.biography
        .toLowerCase()
        .includes(inputTxt.toLowerCase());
      const validSelect = selected === "Default" || selected === p.position;
      return (validInput || validBio) && validSelect;
    });
  }, [politicians, inputTxt, selected]);

  return (
    <>
      <h1>Lista di politici</h1>
      <input
        type="text"
        value={inputTxt}
        onChange={(e) => setInputTxt(e.target.value)}
      />
      <select name="positions" onChange={(e) => setSelected(e.target.value)}>
        <option value="Default">Tutte le posizioni</option>
        {PolPositions.map((p, i) => {
          return (
            <option key={i} value={p}>
              {p}
            </option>
          );
        })}
      </select>
      <div className="card-grid">
        {filteredList.map((p) => (
          <Card key={p.id} politician={p} />
        ))}
      </div>
    </>
  );
}

export default App;
