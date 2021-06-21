import React, { useState } from 'react';
import Profile from './Profile';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { message } from 'antd';
import { ValidateProfile } from '../../core/index';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/user-reducer';

const ProfileContainer = props => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [changeEmailLoading, setChangeEmailLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector(store => store);
  const dispatch = useDispatch();

  const auth = firebase.auth().currentUser;
  const db = firebase.firestore();

  const checkUser = async (email, password) => {
    try {
      var credentials = firebase.auth.EmailAuthProvider.credential(
        email,
        password,
      );
      await auth.reauthenticateWithCredential(credentials);
      return true;
    } catch (error) {
      message.error('Ошибка, неверный пароль');
      return false;
    }
  };

  const changeEmail = async () => {
    setChangeEmailLoading(true);
    try {
      if (await checkUser(auth.email, password)) {
        if (ValidateProfile.email(email)) {
          await auth.updateEmail(email);
          const newUser = {
            ...user,
            email: email,
          };
          await db.collection('users').doc(newUser.uid).set(newUser);
          dispatch(setUser(newUser));
          message.success('Почта была успешно изменена');
        } else {
          message.error('Укажите новую электронную почту в верном формате');
        }
      }
    } catch (error) {
      message.error('Ошибка');
    }
    setChangeEmailLoading(false);
  };

  const changePassword = async () => {
    setChangePasswordLoading(true);
    try {
      if (await checkUser(auth.email, oldPassword)) {
        if (
          ValidateProfile.password(newPassword) &&
          newPassword === repeatPassword
        ) {
          await auth.updatePassword(newPassword);
          message.success('Пароль был успешно изменен');
        } else {
          message.error(
            'Пароли должны совпадать и содержать как минимум 8 символов',
          );
        }
      }
    } catch (error) {
      message.error('Ошибка');
    }
    setChangePasswordLoading(false);
  };

  return (
    <Profile
      oldPassword={oldPassword}
      newPassword={newPassword}
      changePasswordLoading={changePasswordLoading}
      changeEmailLoading={changeEmailLoading}
      password={password}
      setOldPassword={setOldPassword}
      setNewPassword={setNewPassword}
      setPassword={setPassword}
      setRepeatPassword={setRepeatPassword}
      setEmail={setEmail}
      email={email}
      changeEmail={changeEmail}
      changePassword={changePassword}
      repeatPassword={repeatPassword}
      {...props}
    />
  );
};

export default ProfileContainer;
