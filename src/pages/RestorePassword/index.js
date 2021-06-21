import React from 'react';
import { useState } from 'react';
import RestorePassword from './RestorePassword';
import firebase from 'firebase/app';
import 'firebase/auth';
import { message } from 'antd';

const RestorePasswordContainer = props => {
  const [email, setEmail] = useState('');

  const sendEmail = async () => {
    try {
      message.loading({ content: 'Loading', key: 'add-session' });
      firebase.auth().sendPasswordResetEmail(email);
      message.success({ content: 'Успешно', key: 'add-session' });
    } catch (error) {
      message.error({
        content: 'Кажется, что-то пошло не так. Попробуйте позже.',
        key: 'add-session',
      });
    }
  };

  return (
    <RestorePassword
      sendEmail={sendEmail}
      email={email}
      setEmail={setEmail}
      {...props}
    />
  );
};

export default RestorePasswordContainer;
