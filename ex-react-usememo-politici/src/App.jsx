import { useState, useEffect, useMemo, useCallback } from "react";
import Card from "./components/card";
import "./App.css";
function debounce(callback, timer) {
  let timerId;
  return (value) => {
    window.clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(value);
    }, timer);
  };
}

function App() {
  // fetch lista di politici
  const [politicians, setPoliticians] = useState([]);
  const fetchPolitician = async () => {
    const result = await fetch("http://localhost:3333/politicians");
    const politicians = await result.json();
    setPoliticians(politicians);
  };
  useEffect(() => {
    fetchPolitician();
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
      // booleano per capire se il nome é valido rispetto alla ricerca
      const validInput = p.name.toLowerCase().includes(inputTxt.toLowerCase());
      // booleano per capire se la bio é valida rispetto alla ricerca
      const validBio = p.biography
        .toLowerCase()
        .includes(inputTxt.toLowerCase());
      // booleano per capire se la posizione é valida rispetto alla scelta
      const validSelect = selected === "Default" || selected === p.position;
      return (validInput || validBio) && validSelect;
    });
  }, [politicians, inputTxt, selected]);

  // ottimizzazione della ricerca
  const debouncedInputCallback = useCallback(
    debounce((input) => {
      setInputTxt(input);
    }, 400),
    [],
  );

  return (
    <>
      <h1>Lista di politici</h1>
      <input
        type="text"
        // value={inputTxt} commentato per permettere un uso ottimale del debounce
        onChange={(e) => debouncedInputCallback(e.target.value)}
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
