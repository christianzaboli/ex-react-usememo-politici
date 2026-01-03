import { useState, useEffect } from "react";
import Card from "./components/card";
import "./App.css";
function App() {
  const [politicians, setPoliticians] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then((res) => res.json())
      .then((res) => setPoliticians(res))
      .catch((err) => console.error(err));
  }, []);
  const [filteredList, setFilteredList] = useState();
  const [inputTxt, setInputTxt] = useState("");
  function handleChangeFilter(e) {
    const inputTerm = e.target.value;
    setInputTxt(inputTerm);
    const filteredP = politicians.filter(
      (p) =>
        p.name.toLowerCase().includes(inputTerm.toLowerCase()) ||
        p.biography.toLowerCase().includes(inputTerm.toLowerCase())
    );
    if (!inputTerm) {
      setFilteredList(politicians);
    } else {
      setFilteredList(filteredP);
    }
  }

  return (
    <>
      <h1>Lista di politici</h1>
      <input
        type="text"
        value={inputTxt}
        onChange={(e) => handleChangeFilter(e)}
      />
      <div className="card-grid">
        {filteredList
          ? filteredList.map((p) => <Card key={p.id} politician={p} />)
          : politicians.map((p) => <Card key={p.id} politician={p} />)}
      </div>
    </>
  );
}

export default App;
