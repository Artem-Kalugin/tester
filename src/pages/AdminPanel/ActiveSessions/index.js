import React, { useState, useEffect } from 'react';
import ActiveSessions from './ActiveSessions';
import firebase from "firebase/app";
import { message } from 'antd';
import "firebase/auth";
import "firebase/firestore";

const ActiveSessionsContainer = props => {
  const [fetched, setFetched] = useState(false);
  const [sessions, setSessions] = useState();
  const db = firebase.firestore();


  const getSessions = async () => {
    setFetched(false);
    try {
      const _sessions = await db.collection("sessions").get();
      const _result = _sessions.docs.map((doc) => {
        return doc.data();
      })
      setSessions(_result);
      console.log(_result);
    } catch (e) {
      message.error({ content: 'Не удалось получить список сессий', key: 'add-student' });
    }
    setFetched(true);
  }

  useEffect(() => {
    getSessions();
  }, [])

  return (
    <ActiveSessions sessions={sessions} {...props} />
  );
};

export default ActiveSessionsContainer;