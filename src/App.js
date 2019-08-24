import React from 'react';
import './App.css';
import WeatherWidget from './components/WeatherWidget';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as statuses from './constants/entriesStatuses';

function App() {
  const statusesInPath = Object.values(statuses)
    .map(s => s.toLowerCase())
    .join('|');

  return (
    <div className="App">
      <h1 className="App-Header">Weather Widget</h1>
      <Switch>
        <Route
          path={`/:selectedStatus(${statusesInPath})`}
          component={WeatherWidget}
        />
        <Route
          render={() => <Redirect to={`/${statuses.ALL.toLowerCase()}`} />}
        ></Route>
      </Switch>
    </div>
  );
}

export default App;
