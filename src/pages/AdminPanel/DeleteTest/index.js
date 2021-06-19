import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import DeleteTest from './DeleteTest';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  ExclamationCircleOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

const DeleteTestContainer = props => {
  const db = firebase.firestore();
  const [tests, setTests] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [selectedTest, setSelectedTest] = useState();

  const getTests = async () => {
    setFetched(false);
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
      setFetched(true);
    } catch (e) {}
  };

  const deleteTestModal = async selectedTest => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content:
        'Удалив тест вы так же удалите все сессии связанные с этим тестом, вы действительно хотите продолжить?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        deleteTest(selectedTest);
      },
    });
  };

  const deleteTest = async () => {
    try {
      message.loading({ content: 'Идет удаление', key: 'delete-test' });
      await db.collection('tests').doc(selectedTest).delete();
      const sessions = await db
        .collection('sessions')
        .where('testId', '==', selectedTest)
        .get();
      for (const ses of sessions.docs) {
        await ses.ref.delete();
      }
      message.success({ content: 'Успешно', key: 'delete-test' });
      getTests();
      setSelectedTest();
    } catch (e) {
      message.error({ content: 'Что-то пошло не так', key: 'delete-test' });
      console.log(e);
    }
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <DeleteTest
      deleteTest={deleteTestModal}
      selectedTest={selectedTest}
      setSelectedTest={setSelectedTest}
      fetched={fetched}
      tests={tests}
      {...props}
    />
  );
};

export default DeleteTestContainer;
