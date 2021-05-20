import './App.css';
import { Header } from './components';
import { AdminPanel, Welcoming, Tests, Login, Registration, Test, TestResults } from './pages';
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect
} from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './store/user-reducer';
import moment from 'moment';


moment.locale('ru');


const Main = () => {
  const [isCalculated, setIsCalculated] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();
  const userState = useSelector(store => store);

  const detectUser = async () => {
    await firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(opts => {
          dispatch(setUser(opts.data()));
        });
        setIsLogged(true);
      } else {
        dispatch(clearUser());
        setIsLogged(false);
      }
      setIsCalculated(true);
    });
  }

  useEffect(() => {
    detectUser();
  }, [])


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
          <Route path="/results">
            <TestResults />
          </Route>
          {userState.role === 'admin' ? 
          <Route path="/admin">
            <AdminPanel />
          </Route> : null}
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
