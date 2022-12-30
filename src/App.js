import "./App.css";
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <header className="App-header">Weather Search</header>
      <form>
        <input type="search" />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
}

export default App;
