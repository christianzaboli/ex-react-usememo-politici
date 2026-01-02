import { useState, useEffect } from "react";

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
      {politicians.length > 0 && politicians.map((p, i) => <card {...p} />)}
    </>
  );
}

export default App;
