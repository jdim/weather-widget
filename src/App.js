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
      <div className="App-Container">
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
        <p className="App-Github">
          You can see code on{' '}
          <a
            className="App-GithubLink"
            href="https://github.com/jdim/weather-widget"
            target="_blank"
            rel="noopener noreferrer"
          >
            my GitHub{' '}
            <img className="App-GithubImg" src="/GitHub-Mark-64px.png" alt="" />{' '}
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;
