import React, { useState, useEffect } from 'react';
import ActiveSessions from './Sessions';
import firebase from "firebase/app";
import { message } from 'antd';
import "firebase/auth";
import "firebase/firestore";

const ActiveSessionsContainer = props => {
  const [fetched, setFetched] = useState(false);
  const [groups, setGroups] = useState(false);
  const [sessions, setSessions] = useState();
  const db = firebase.firestore();

  const getGroups = async () => {
    try {
      await db.collection("groups").get().then((querySnapshot) => {
        const parsed = [];
        querySnapshot.forEach((doc) => {
            parsed.push({
              uid: doc.id,
              ...doc.data()
            });
        });
        setGroups(parsed);
        formatSessions(parsed);
      });
    } catch {
      
    }
  }

  const formatSessions = async (groupsParsed = groups) => {
    setSessions(old => old.map(el => {
      const amount = el.groups.reduce((acc, x) => {
        return acc + groupsParsed.find((item) => item.group === x).studentAmount;
      }, 0)
      return {...el, studentsAmount: amount};
    }));
    setFetched(true);
  }

  const getSessions = async () => {
    setFetched(false);
    try {
      const _sessions = await db.collection("sessions").get();
      const _result = _sessions.docs.map((doc) => {
        return doc.data();
      })
      setSessions(_result);
      getGroups();
    } catch (e) {
      message.error({ content: 'Не удалось получить список сессий', key: 'add-student' });
    }
  }

  useEffect(() => {
    getSessions();
  }, [])

  return (
    <ActiveSessions sessions={sessions} {...props} />
  );
};

export default ActiveSessionsContainer;