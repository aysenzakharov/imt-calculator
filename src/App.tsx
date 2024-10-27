import React from 'react';
import logo from './logo.svg';
import './App.css';
import IMTCalculator from './IMTCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Калькулятор ИМТ</p>
        <IMTCalculator/>
      </header>
    </div>
  );
}

export default App;
