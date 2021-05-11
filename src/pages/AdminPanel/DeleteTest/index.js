import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import DeleteTest from './DeleteTest';
import firebase from "firebase/app";
import "firebase/firestore";

const DeleteTestContainer = props => {
  const db = firebase.firestore();
  const [tests, setTests] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [selectedTest, setSelectedTest] = useState();

  const getTests = async () => {
    setFetched(false);
    setTests();
    try {
      await db.collection("tests").get().then((querySnapshot) => {
        const parsed = [];
        querySnapshot.forEach((doc) => {
            parsed.push({
              uid: doc.id,
              name: doc.data().name,
            });
        });
        setTests(parsed);
      });
      setFetched(true)
    } catch (e) {

    }
  }

  const deleteTest = async () => {
    try {
      message.loading({ content: 'Идет удаление', key : 'delete-test'});
      await db.collection("tests").doc(selectedTest).delete();
      message.success({ content: 'Успешно', key : 'delete-test'});
      getTests();
      setSelectedTest();
    } catch (e) {
      message.error({ content: 'Что-то пошло не так', key : 'delete-test'});
      console.log(e);
    }
  }

  useEffect(() => {
    getTests();
  }, [])

  return (
    <DeleteTest deleteTest={deleteTest} selectedTest={selectedTest} setSelectedTest={setSelectedTest} fetched={fetched} tests={tests} {...props} />
  );
};

export default DeleteTestContainer;