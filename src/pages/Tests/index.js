import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tests from './Tests';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/ru';
import { useHistory } from 'react-router';

moment.locale('ru');

export const prettyCountyWord = (counter, oneWord, noWord, aLotOfWord) => {
  if (counter % 10 === 1 && counter !== 11) {
    return oneWord;
  } else if (
    [2, 3, 4].some(el => el === counter % 10) &&
    ![12, 13, 14].some(el => el === counter)
  ) {
    return noWord;
  } else {
    return aLotOfWord;
  }
};

const TestsContainer = props => {
  const userState = useSelector(store => store);
  const db = firebase.firestore();
  const [sessions, setSessions] = useState();
  const [tests, setTests] = useState();
  const [data, setData] = useState();
  const history = useHistory();
  
  const getSessions = async () => {
    try {
      if (userState?.group) { 
        const studentSessions = await db.collection('sessions').where('groups', 'array-contains', userState.group).get();
        const mappedSessions = studentSessions.docs.map(el => el.data());
        setSessions(mappedSessions);
        getTests(mappedSessions);
      }
    } catch (e) {
      console.log(e);
    }
  }

  const getTests = async (sessions = sessions) => {
    try {
      const testNames = sessions.map(el => el.testName);
      const _tests = await db.collection('tests').get();
      const mappedTests = _tests.docs.map(el => el.data());
      setTests(mappedTests);
      setData(formatData(sessions, mappedTests));
    } catch (e) {
      console.log(e);
    }
  }
  
  const doTest = (test, limit) => {
    console.log(Date.now());
    history.push({
      pathname: '/test',
      state: {test: test, limit: limit}
    })
  }

  const formatData = (_sessions = sessions, _tests = tests) => {
    return _sessions.map((el) => {
      const date = moment(el.attemptTime, 'HH:mm');
      const test = _tests.find(item => el.test === item.name);
      const hoursLimit = date.format('HH');
      const minsLimit = date.format('mm');
      const title = test.name;
      console.log(moment(el.date).format('DD MMMM HH:mm'));
      const questionAmount = test.questions.length;
      const hoursFormat = +hoursLimit ? `${+hoursLimit} ${prettyCountyWord(+hoursLimit, 'час', 'часа', 'часов')}` : '';
      const minsFormat = +minsLimit ? `${minsLimit} ${prettyCountyWord(minsLimit, 'минута', 'минут', 'минут')}` : '';
      return {
        limit: hoursLimit * 3600 * 1000 + +minsLimit * 60 * 1000,
        test: test,
        title: title,
        questionsAmount: questionAmount,
        timeLimit:  hoursFormat + minsFormat,
        date: moment(el.date).format('DD MMMM HH:mm'),
      }
    })
  }

  useEffect(() => {
    getSessions();
  }, [userState])

  return (
    <Tests doTest={doTest} data={data} {...props} />
  );
};


export default TestsContainer;