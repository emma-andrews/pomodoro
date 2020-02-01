import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import axios from 'axios';

import NavBar from './components/NavBar';
import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import WelcomePage from './pages/WelcomePage';

import paths from './RouterPaths';

const App = (props) => {
  // const explode = (event) => {
  //   event.preventDefault();
  //   const queryParam = { client_id: '76129ea0ca4d4b30a96ed40ec1eb433f' };
  //   axios
  //     .get('https://accounts.spotify.com/authorize', {
  //       params: queryParam,
  //       mode: 'no-cors',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
  //         'Access-Control-Allow-Headers': 'Content-Type',
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path={paths.welcomePage} component={WelcomePage} />
        <Route path={paths.settingsPage} component={SettingsPage} />
        <Route path={paths.accountPage} component={AccountPage} />
        <Route path={paths.homePage} component={HomePage} />
      </Switch>
    </>
  );
};

export default App;
