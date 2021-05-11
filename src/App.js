import './App.css';
import { Header } from './components';
import { AdminPanel, Welcoming, Tests, Login, Registration, Test } from './pages';
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useState } from 'react';


const Main = () => {
  const [isCalculated, setIsCalculated] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const detectUser = async () => {
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
      setIsCalculated(true);
    });
  }

  detectUser();

  if (isLogged) {
  return (
        <>
        <Header />    
        <Switch>
          <Route exact path="/">
            <Welcoming />
          </Route>
          <Route path="/tests">
            <Tests />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
        </Switch> 
        </>
        );
  } else {
    if (isCalculated) return <Redirect to='/login' />
    else return null;
  }
}
function App() {
  return (
    <div>
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration/>
        </Route>
        <Route path='/'>
          <Main />
        </Route>
      </Switch> 
    </div>
    </Router>
    </div>
  );
}

export default App;
