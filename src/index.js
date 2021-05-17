import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import "firebase/auth";
import { FirebaseAuthProvider } from '@react-firebase/auth'
import { Provider } from 'react-redux';
import { store } from './store/index';

const config = {
  apiKey: "AIzaSyCLr3GLQExS1zUXTOkUdIVPEqY2WFf3Ou0",
  authDomain: "tester-c329f.firebaseapp.com",
  projectId: "tester-c329f",
  storageBucket: "tester-c329f.appspot.com",
  messagingSenderId: "823822150085",
  appId: "1:823822150085:web:027b8bd3b6cd55bcda03ac",
  measurementId: "G-5T7L5M27ND"
};

firebase.initializeApp(config);
console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAuthProvider firebase={firebase} {...config}>
      <Provider store={store}>
        <App />
      </Provider>
    </FirebaseAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

