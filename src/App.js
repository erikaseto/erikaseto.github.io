import React from "react";
// import logo from './logo.svg';
import './App.css';
import Portfolio from './components/Portfolio.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1 className="text-6xl font-bold text-red-500">Tailwind Works!</h1> */}
        <Portfolio />
        <p>
          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </header>
    </div>
  );
}

export default App;
