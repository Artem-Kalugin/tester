import React, { useState } from 'react';
import Registration from './Registration';
import { ValidateProfile } from '../../core/index';
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import 'firebase/auth';
import 'firebase/firestore';
import { EyeInvisibleOutlined } from '@ant-design/icons';

const RegistrationContainer = props => {
  const [data, setData] = useState(null);
  const history = useHistory();

  const db = firebase.firestore();

  const [loading, setLoading] = useState(false);

  const [inviteCode, setInviteCode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const recieve = async () => {
    setLoading(true);
    try {
      message.loading({
        content: 'Подождите, идет загрузка',
        key: 'invite-code',
      });
      const invite = await db
        .collection('invites')
        .where('inviteCode', '==', inviteCode)
        .get();
      const recievedData = invite.docs[0].data();
      if (!recievedData) {
        throw new Error();
      }
      setData(recievedData);
      message.success({ content: 'Инвайт код найден', key: 'invite-code' });
    } catch (e) {
      message.error({
        content: 'Проверьте правильность введенного инвайт кода.',
        key: 'invite-code',
      });
    }
    setLoading(false);
  };
  const register = async () => {
    setErrorMessage('');
    setLoading(true);
    if (password === repeatPassword) {
      if (ValidateProfile.email(email)) {
        if (ValidateProfile.password(password)) {
          try {
            message.loading({
              content: 'Подождите, идет загрузка',
              key: 'registration',
            });
            const invite = await db
              .collection('invites')
              .where('inviteCode', '==', inviteCode)
              .get();
            const { user } = await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
            const addUser = await db.collection('users').doc(user.uid).set({
              name: data.name,
              uid: user.uid,
              lastName: data.lastName,
              group: data.group,
              email: email,
              notDeleted: true,
              role: 'student',
            });
            const incrementGroup = await db
              .collection('groups')
              .where('group', '==', data.group)
              .limit(1)
              .get();
            await incrementGroup.docs[0].ref.update({
              studentAmount: firebase.firestore.FieldValue.increment(1),
            });
            await firebase
              .auth()
              .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              .then(() => {
                firebase.auth().signInWithEmailAndPassword(email, password);
              });
            await invite.docs[0].ref.delete();
            message.success({ content: 'Успешно', key: 'registration' });
            history.push('/');
          } catch (e) {
            firebase.auth().currentUser.delete();
            message.error({
              content: 'Кажется, что-то пошло не так. Попробуйте позже',
              key: 'registration',
            });
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
    setLoading(false);
  };

  return (
    <Registration
      recieve={recieve}
      setInviteCode={setInviteCode}
      loading={loading}
      register={register}
      errorMessage={errorMessage}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      repeatPassword={repeatPassword}
      setRepeatPassword={setRepeatPassword}
      data={data}
      {...props}
    />
  );
};

export default RegistrationContainer;
