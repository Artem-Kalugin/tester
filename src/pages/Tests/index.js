import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Tests from './Tests';
import firebase from 'firebase';
import 'firebase/firestore';
import moment from 'moment';
import 'moment/locale/ru';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined, TrophyOutlined } from '@ant-design/icons';
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
  const [initialized, setInitialized] = useState(false);
  const [activeTests, setActiveTests] = useState();
  const [passedTests, setPassedTests] = useState();
  const [inactiveTests, setInactiveTests] = useState();
  const [mode, setMode] = useState('all');
  const history = useHistory();

  const getSessions = async () => {
    try {
      if (userState?.group) {
        const currentTime = await firebase.firestore.Timestamp.now();
        const studentSessions = await db
          .collection('sessions')
          .where('groups', 'array-contains', userState.group)
          .get();
        const mappedSessions = [];
        for (const el of studentSessions.docs) {
          const doc = await el.ref
            .collection('attempts')
            .doc(userState.uid)
            .get();

          let score;
          let isTooLate = false;
          if (doc.exists) {
            score = doc.data().score;
          }

          const sessionData = el.data();
          if (
            moment(moment(currentTime.seconds * 1000)).isAfter(
              sessionData.date,
            ) &&
            !score
          ) {
            score = 0.0;
            isTooLate = true;
          }
          mappedSessions.push({
            ...el.data(),
            sessionId: el.id,
            score: score,
            isTooLate: isTooLate,
          });
        }
        setSessions(mappedSessions);
        getTests(mappedSessions);
      }
    } catch (e) {
      // console.log(e);
    }
  };

  const getTests = async (sessions = sessions) => {
    try {
      const testNames = sessions.map(el => el.testName);
      const _tests = await db.collection('tests').get();
      const mappedTests = _tests.docs.map(el => el.data());
      setTests(mappedTests);
      formatData(sessions, mappedTests);
      setInitialized(true);
    } catch (e) {
      // console.log(e);
    }
  };

  const registerAttempt = async (test, limit, sessionId, maxDate) => {
    try {
      message.loading({ content: 'Подождите, идет загрузка', key: 'wait' });
      const currentTime = await firebase.firestore.Timestamp.now();
      if (moment(currentTime.seconds * 1000).isAfter(moment(maxDate))) {
        message.loading({ content: 'Тест более недоступен', key: 'wait' });
        history.push('/');
      }
      await db
        .collection('sessions')
        .doc(sessionId)
        .collection('attempts')
        .doc(userState.uid)
        .set({ score: 0 });
      history.push({
        pathname: '/test',
        state: { test: test, limit: limit, sessionId: sessionId },
      });
      message.destroy('wait');
    } catch (e) {
      message.error({
        content: 'Что-то пошло не так, попробуйте еще раз',
        key: 'wait',
      });
    }
  };

  const doTest = (test, limit, sessionId, maxDate) => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content:
        'У вас будет всего одна попытка для прохождения данного теста. Не закрывайте вкладку с тестом до тех пор, пока не отправите ответ, иначе результат не сохранится а возможность прохождения теста заблокируется.',
      okText: 'Начать',
      cancelText: 'Назад',
      onOk() {
        registerAttempt(test, limit, sessionId, maxDate);
      },
    });
  };

  const formatData = (_sessions = sessions, _tests = tests) => {
    const active = [];
    const passed = [];
    const inactive = [];
    _sessions.map(el => {
      const date = moment(el.attemptTime, 'HH:mm');
      const test = _tests.find(item => el.test === item.name);
      const hoursLimit = date.format('HH');
      const minsLimit = date.format('mm');
      console.log(date, hoursLimit, minsLimit);
      const title = test.name;
      const questionAmount = test.questions.length;
      const hoursFormat = +hoursLimit
        ? `${+hoursLimit} ${prettyCountyWord(
            +hoursLimit,
            'час',
            'часа',
            'часов',
          )}`
        : '';
      const minsFormat = +minsLimit
        ? `${minsLimit} ${prettyCountyWord(
            minsLimit,
            'минута',
            'минут',
            'минут',
          )}`
        : '';
      const testObj = {
        score: el.score,
        sessionId: el.sessionId,
        limit: hoursLimit * 3600 * 1000 + +minsLimit * 60 * 1000,
        test: test,
        title: title,
        questionsAmount: questionAmount,
        timeLimit: hoursFormat + minsFormat,
        unformatedDate: el.date,
        isTooLate: el.isTooLate,
        date: moment(el.date).format('DD MMMM HH:mm'),
      };
      if (el.isTooLate) {
        inactive.push(testObj);
      } else if (typeof el.score !== 'undefined') {
        passed.push(testObj);
      } else {
        active.push(testObj);
      }
    });
    setActiveTests(
      active.sort((a, b) => {
        if (moment(a.unformatedDate).isAfter(moment(b.unformatedDate))) {
          return 1;
        } else {
          return -1;
        }
      }),
    );
    setPassedTests(
      passed.sort((a, b) => {
        if (moment(a.unformatedDate).isAfter(moment(b.unformatedDate))) {
          return -1;
        } else {
          return 1;
        }
      }),
    );
    setInactiveTests(
      inactive.sort((a, b) => {
        if (moment(a.unformatedDate).isAfter(moment(b.unformatedDate))) {
          return -1;
        } else {
          return 1;
        }
      }),
    );
  };

  useEffect(() => {
    getSessions();
  }, [userState]);

  return (
    <Tests
      initialized={initialized}
      doTest={doTest}
      mode={mode}
      setMode={setMode}
      activeTests={activeTests}
      passedTests={passedTests}
      inactiveTests={inactiveTests}
      {...props}
    />
  );
};

export default TestsContainer;
