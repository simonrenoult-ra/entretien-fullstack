import './App.css';
import {useEffect, useState} from "react";


function App() {
  const [, setCarboneFootprints] = useState(null)

  useEffect(() => {
    const url = "http://localhost:1337/carbone-footprints";
    fetch(url)
        .then(response => response.json())
        .then((data) => {
          setCarboneFootprints(data)
        })
        .catch((error) => {
          console.error(error)
        })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Michelle</h1>
        <p>Shall we start?</p>
      </header>
    </div>
  );
}

export default App;
