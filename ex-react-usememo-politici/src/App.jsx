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
  return (
    <>
      <h1>Lista di politici</h1>
      <div className="card-grid">
        {politicians.length > 0 &&
          politicians.map((p) => <Card politician={p} />)}
      </div>
    </>
  );
}

export default App;
