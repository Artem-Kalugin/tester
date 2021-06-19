import React, { useState } from 'react';
import Login from './Login';
import firebase from 'firebase/app';
import 'firebase/auth';
import { message } from 'antd';
import { useHistory } from 'react-router-dom';

const LoginContainer = props => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = async () => {
    console.log('sign');
    try {
      const persist = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(async () => {
          return firebase.auth().signInWithEmailAndPassword(email, password);
        });
      console.log(persist);
      history.push('/');
    } catch (e) {
      message.error('Кажется, что-то пошло не так. Попробуйте позже');
      console.log(e);
    }
  };

  return (
    <Login
      signIn={signIn}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      {...props}
    />
  );
};

export default LoginContainer;
