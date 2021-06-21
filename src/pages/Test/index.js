import React, { useEffect, useState } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router';
import Test from './Test';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import moment from 'moment';
import sendEmail from '../../utils/sendEmail';
import ReactDOMServer from 'react-dom/server';
import EmaiQuestions from '../../components/EmaiQuestions/EmaiQuestions';

const addZero = value => {
  if (value < 10) {
    return '0' + value;
  }
  return value;
};

const preFormatData = test => {
  return {
    ...test,
    questions: test?.questions?.map(el => {
      return {
        ...el,
        answers: el?.answers?.map(item => {
          return {
            ...item,
            selected: false,
          };
        }),
      };
    }),
  };
};

const TestContainer = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(0);
  const location = useLocation();
  const [test, setTest] = useState(preFormatData(location?.state?.test));
  const sessionId = location?.state?.sessionId;
  const [limit] = useState(Date.now() + location?.state?.limit);
  const [timeLeft, setTimeLeft] = useState(location?.state?.limit);
  const [testLength] = useState(location?.state?.test?.questions?.length);
  const [showModal, setShowModal] = useState(false);
  const [locked, setLocked] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const userState = useSelector(store => store);
  let time = location?.state?.limit;
  let [startTime] = useState(new Date());

  const nextQuestion = () => {
    setCurrQuestion(old => (old < testLength - 1 ? old + 1 : old));
  };

  const previousQuestion = () => {
    setCurrQuestion(old => (old > 0 ? old - 1 : old));
  };

  const setCurrentQuestion = value => {
    setCurrQuestion(value);
  };

  const sendResults = async force => {
    if (!locked) {
      setLocked(true);
      try {
        message.loading({ content: 'Отправка результатов', key: 'send-res' });
        const _elapsedTime = limit - timeLeft - startTime;
        const score = (
          test.questions
            .map(el => {
              if (el.answers.every(item => item.isRight === item.selected)) {
                return el.weight / test.summaryWeight;
              } else {
                return 0;
              }
            })
            .reduce((acc, el) => el + acc, 0) * 100
        ).toFixed(1);
        const [minutes = '1', seconds = '00'] = (
          '' +
          _elapsedTime / 1000 / 60
        ).split('.');
        const secondsCalculated = (
          (+seconds.substring(0, 2) * 60) /
          100
        ).toFixed(0);
        const elapsedTime = addZero(minutes) + ':' + addZero(secondsCalculated);
        const result = {
          ...test,
          score: score,
          elapsedTime: elapsedTime,
          name: userState.name,
          group: userState.group,
          lastName: userState.lastName,
          testName: test.name,
        };
        await db
          .collection('sessions')
          .doc(sessionId)
          .collection('attempts')
          .doc(userState.uid)
          .set(result);
        message.success({
          content: 'Результат сохранен',
          key: 'send-res',
        });
        try {
          await sendEmail({
            name: result.name,
            group: result.group,
            lastName: result.lastName,
            html: ReactDOMServer.renderToStaticMarkup(
              <EmaiQuestions emailing={true} obj={result} />,
            ),
          });
        } catch (e) {}
        history.push('/tests');
        setLocked(false);
      } catch (e) {
        if (force) {
          history.push('/tests');
          message.error({ content: 'Время вышло.', key: 'send-res' });
        } else {
          message.error({ content: 'Ошибка.', key: 'send-res' });
        }
      }
      setLocked(false);
    }
  };

  const confirmSending = () => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content:
        'Отправив результат теста вы не сможете изменить его в будущем. Учитель получит детальную информацию о ходе прохождения теста. Вы действительно хотите отправить результаты прохождения?',
      okText: 'Да.',
      cancelText: 'Нет.',
      onOk() {
        sendResults();
      },
    });
  };

  const markAnswer = (question, answer, index) => {
    const _test = { ...test };
    if (question.multiselection) {
      question.answers = question.answers.map((el, idx) => {
        if (idx === index) {
          return { ...el, selected: !el.selected };
        }
        return el;
      });
    } else {
      question.answers = question.answers.map((el, idx) => {
        if (idx === index) {
          return { ...el, selected: !el.selected };
        }
        return { ...el, selected: false };
      });
    }
    setTest(_test);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const _timeLeft = limit - Date.now();
      if (time < _timeLeft) {
        time = 0;
        sendResults(true);
      }
      if (time <= 0) {
        sendResults(true);
      }
      setTimeLeft(_timeLeft);
      time = _timeLeft;
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!test) {
    return <Redirect to="/" />;
  }

  return (
    <Test
      sendResults={confirmSending}
      markAnswer={markAnswer}
      showDrawer={showDrawer}
      test={test}
      timeLeft={timeLeft}
      setCurrentQuestion={setCurrentQuestion}
      questionIndex={currQuestion}
      nextQuestion={nextQuestion}
      previousQuestion={previousQuestion}
      setShowDrawer={setShowDrawer}
      currentQuestion={test.questions[currQuestion]}
      {...props}
    />
  );
};

export default TestContainer;
