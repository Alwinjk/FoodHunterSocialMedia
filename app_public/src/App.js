import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./components/login/Login";

import Signup from './components/Signup/Signup';
import Profile from './components/Profile/Profile';
import Dashboard from './components/dashboard/Dashboard';

import useToken from './useToken';
import FriendUser from "./components/frienduser/FriendUser";

function App() {
  
  // this is only to store the token from storage only if there is, unless it will remain empty
  const {token, setToken} = useToken();

  // rendering occurs from here
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
          <Route path="/profile/:userid">
            {token ? <Profile /> : <Login setToken={setToken} />}
          </Route>
          <Route  path="/view-profile">
            {token ? <FriendUser /> : <Login setToken={setToken}/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
