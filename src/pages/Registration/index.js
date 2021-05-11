import React, {useState} from 'react';
import Registration from './Registration';
import { ValidateProfile } from '../../core/index';
import firebase from "firebase/app";
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import "firebase/auth";
import "firebase/firestore";

const RegistrationContainer = props => {
  const data = {
    name:'admin',
    lastName:'admin',
    group:'admins',
  }

  const history = useHistory();

  const db = firebase.firestore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const register = async () => {
    setErrorMessage('');
    if (password === repeatPassword) {
      if (ValidateProfile.email(email)) {
        if (ValidateProfile.password(password)) {
          try {
            const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const addUser = await db.collection("users").doc(user.uid).set({
              'name': data.name,
              lastName: data.lastName,
              group: data.group,
              email: email,
              role: 'student',
            })
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
              firebase.auth().signInWithEmailAndPassword(email, password);
            });
            history.push('/');
          } catch (e) {
            message.error('Кажется, что-то пошло не так. Попробуйте позже');
            console.log(e);
          }
        } else {
          setErrorMessage('Пароль должен содержать минимум 8 символов');
        }
      } else {
        setErrorMessage('Введите почту в корректном формате');
      }
    } else {
      setErrorMessage('Введенные пароли не совпадают');
    }
  }

  return (
    <Registration register={register} errorMessage={errorMessage} email={email} setEmail={setEmail} password={password} setPassword={setPassword} repeatPassword={repeatPassword} setRepeatPassword={setRepeatPassword} data={data} {...props} />
  );
};

export default RegistrationContainer;