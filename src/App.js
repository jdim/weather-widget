import React from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget';

function App() {
  return (
    <div className="App">
      <h1 className="App-Header">Weather Widget</h1>
      <WeatherWidget />
    </div>
  );
}

export default App;
