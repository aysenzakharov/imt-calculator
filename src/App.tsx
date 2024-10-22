import React from 'react';
import logo from './logo.svg';
import './App.css';
import AgeCalculator from './AgeCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Калькулятор лет</p>
        <AgeCalculator/>
      </header>
    </div>
  );
}

export default App;
