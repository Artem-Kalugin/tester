import React, { useState, useEffect } from 'react';
import ActiveSessions from './Sessions';
import firebase from "firebase/app";
import { message } from 'antd';
import "firebase/auth";
import "firebase/firestore";
import sendEmail from '../../../utils/sendEmail';
import ReactDOMServer from 'react-dom/server';
import EmaiQuestions from '../../../components/EmaiQuestions/EmaiQuestions';

const ActiveSessionsContainer = props => {
  const [fetched, setFetched] = useState(false);
  const [groups, setGroups] = useState(false);
  const [sessions, setSessions] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [details, setDetails] = useState([]);
  const [results, setResults] = useState({});
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

  const email = async (obj) => {
    try {
      message.loading({ content: 'Загрузка', key: 'send-mail' });
      await sendEmail({
        name: obj.name,
        group: obj.group,
        lastName: obj.lastName,
        html: ReactDOMServer.renderToStaticMarkup(
          <EmaiQuestions emailing={true} obj={obj} />
        )
      })
      message.success({ content: 'Письмо отправлено', key: 'send-mail' });
    } catch (e) {
      console.log(e);
      message.error({ content: 'Произошла ошибка при отправлении письма', key: 'send-mail' });
    }
  }

  const showModal = (details) => {
    setDetails(details);
    setShowDetails(true);
  }

  const showResultsModal = (res) => {
    setResults(res);
    setShowResults(true);
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
      const _result = [];
      const _sessions = await db.collection("sessions").get();
      for (const session of _sessions.docs) {
        const doc = await session.ref.collection('attempts').get();
        let attempts = [];
        let attemptsLength = 0;
        if (!doc.empty) {
          attempts = doc.docs.map(el => { 
            return { ...el.data(), studentId: el.id}
          });
          attemptsLength = attempts.length;
        }
        _result.push({...session.data(), attemptsLength: attemptsLength, attempts: attempts})
      }
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
    <ActiveSessions results={results} showResults={showResults} setShowResults={setShowResults} showResultsModal={showResultsModal} details={details} email={email} showDetails={showDetails} setShowDetails={setShowDetails} showModal={showModal} sessions={sessions} {...props} />
  );
};

export default ActiveSessionsContainer;