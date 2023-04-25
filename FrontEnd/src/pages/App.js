//Solomon Hearn wrote this without chatGPT

import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './Login';
import Dashboard from './Dashboard';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };git

  const isLoggedIn = user !== null;

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <LoginForm onLogin={handleLogin} />}
        </Route>
        <Route path="/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
