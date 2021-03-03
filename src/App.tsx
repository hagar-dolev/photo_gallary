import React from "react";
import "./reset.css";
import "./App.css";
import { Gallary } from "./components/Gallary";

function App() {
  return (
    <div className="App">
      <Gallary imageAmount={9} />
    </div>
  );
}

export default App;
