import React, { useEffect, useState } from 'react';
import AddSession from './AddSession';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { message } from 'antd';

const AddSessionContainer = props => {
  const db = firebase.firestore();
  const [testsFetched, setTestsFetched] = useState(false);
  const [groupsFetched, setGroupsFetched] = useState(false);
  const [tests, setTests] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTests = async () => {
    setTestsFetched(false);
    setTests();
    try {
      await db
        .collection('tests')
        .get()
        .then(querySnapshot => {
          const parsed = [];
          querySnapshot.forEach(doc => {
            parsed.push({
              uid: doc.id,
              name: doc.data().name,
            });
          });
          setTests(parsed);
        });
      setTestsFetched(true);
    } catch {}
  };

  const addSession = async params => {
    setLoading(true);
    try {
      message.loading({ content: 'Loading', key: 'add-session' });
      await db.collection('sessions').doc().set(formatParams(params));
      message.success({ content: 'Успешно', key: 'add-session' });
    } catch (e) {
      message.error({
        content: 'Кажется, что-то пошло не так. Попробуйте позже.',
        key: 'add-session',
      });
    }
    setLoading(false);
  };

  const formatParams = params => {
    const newParams = { ...params };
    newParams.test = tests.find(el => el.uid === params.testId).name;
    newParams.date = params.date.format();
    newParams.attemptTime = params.attemptTime.format('HH:mm') || '00:05';
    return newParams;
  };

  const getGroups = async () => {
    setGroupsFetched(false);
    setGroups();
    try {
      await db
        .collection('groups')
        .get()
        .then(querySnapshot => {
          const parsed = [];
          querySnapshot.forEach(doc => {
            parsed.push({
              uid: doc.id,
              ...doc.data(),
            });
          });
          setGroups(parsed);
        });
      setGroupsFetched(true);
    } catch {}
  };

  useEffect(() => {
    getGroups();
    getTests();
  }, []);

  return (
    <AddSession
      loading={loading}
      addSession={addSession}
      groups={groups}
      tests={tests}
      groupsFetched={groupsFetched}
      testsFetched={testsFetched}
      {...props}
    />
  );
};

export default AddSessionContainer;
