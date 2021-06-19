import React, { useState, useEffect } from 'react';
import ShowTest from './ShowTest';
import firebase from 'firebase/app';

const ShowTestContainer = props => {
  const db = firebase.firestore();
  const [fetched, setFetched] = useState(false);
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');

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
              ...doc.data(),
            });
          });
          setTests(parsed);
        });
      setFetched(true);
    } catch (e) {}
  };

  useEffect(() => {
    getTests();
  }, 0);

  return (
    <ShowTest
      fetched={fetched}
      selectedTest={selectedTest}
      setSelectedTest={setSelectedTest}
      tests={tests}
      {...props}
    />
  );
};

export default ShowTestContainer;
