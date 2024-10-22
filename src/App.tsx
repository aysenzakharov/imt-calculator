import React from 'react';
import logo from './logo.svg';
import './App.css';
import DayCalculator from './DayCalculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Калькулятор дней между датами</p>
        <DayCalculator/>
      </header>
    </div>
  );
}

export default App;
