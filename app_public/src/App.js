import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/login/Login";
import Signup from './components/Signup/Signup';
import  Profile from './components/Profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
import Preferences from './components/Preferences/preferences';
import useToken from './useToken';
// import { AuthContext } from "./components/context/AuthContext";

function App() {

  // this is only to store the token from storage only if there is, unless it will remain empty
  const {token, setToken} = useToken();

  console.log("Inside App, token is : " + token);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {token ? <Dashboard /> : <Login setToken={setToken}/>}
          </Route>
          <Route path="/login">
            {token ? <Dashboard /> : <Login setToken={setToken} />}
          </Route>
          <Route path="/signup">
            {token ? <Dashboard /> : <Signup />}
          </Route>
          <Route path="/dashboard">
            {token ? <Dashboard /> : <Login setToken={setToken}/>}
          </Route>
          <Route path="/preferences">
            {/* {token ? <Preferences /> : <Login setToken={setToken}/>} */}
            <Preferences />
          </Route>
          <Route path="/profile">
            {token ? <Profile /> : <Login setToken={setToken} />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
