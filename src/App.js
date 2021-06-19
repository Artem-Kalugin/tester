/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Header } from './components';
import {
  AdminPanel,
  Welcoming,
  Tests,
  Login,
  Registration,
  Test,
  TestResults,
} from './pages';
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
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
    await firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        firebase
          .firestore()
          .collection('users')
          .doc(user.uid)
          .get()
          .then(opts => {
            const userData = opts.data();
            console.log('user data', userData);
            if (!userData?.notDeleted) {
              dispatch(clearUser());
              opts.ref.delete();
              firebase.auth().currentUser.delete();
              setIsLogged(false);
            } else {
              dispatch(setUser(opts.data()));
              setIsLogged(true);
            }
          });
        setIsLogged(true);
      } else {
        dispatch(clearUser());
        setIsLogged(false);
      }
      setIsCalculated(true);
    });
  };

  const updateUser = async () => {
    if (firebase.auth().currentUser) {
      console.log('update user');
      firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then(opts => {
          const userData = opts.data();
          console.log('user data', userData);
          if (!userData?.notDeleted) {
            dispatch(clearUser());
            firebase.auth().currentUser.delete();
            setIsLogged(false);
          } else {
            dispatch(setUser(opts.data()));
            setIsLogged(true);
          }
        });
    }
  };

  useEffect(() => {
    detectUser();
    updateUser();
  }, []);

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
          {userState.role === 'admin' ? (
            <Route path="/admin">
              <AdminPanel />
            </Route>
          ) : null}
        </Switch>
      </>
    );
  } else {
    if (isCalculated) {
      return <Redirect to="/login" />;
    } else {
      return null;
    }
  }
};
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
              <Registration />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
