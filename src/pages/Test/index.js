import React, { useEffect, useState } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router';
import Test from './Test';
import { message, Modal } from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import firebase from 'firebase';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
import moment from 'moment';

const addZero = value => {
  if (value < 10) return '0' + value;
  return value;
};


const TestContainer = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(0);
  const location = useLocation();
  const [test, setTest] = useState(location?.state?.test);
  const [timeLeft, setTimeLeft] = useState();
  const sessionId = location?.state?.sessionId;
  const [limit] = useState(Date.now() + location?.state?.limit);
  const [testLength] = useState(location?.state?.test?.questions?.length);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const db = firebase.firestore();
  const userState = useSelector(store => store);

  const nextQuestion = () => {
    console.log(test.questions[currQuestion+1].answers);
    setCurrQuestion(old => old < (testLength - 1) ? old + 1 : old);
  }

  console.log(moment.duration(location?.state?.limit).hours() * 60);
      console.log(location?.state?.limit);

  const previousQuestion = () => {
    setCurrQuestion(old => old > 0 ? old - 1: old);
  }

  const setCurrentQuestion = (value) => {
    setCurrQuestion(value);
  }

  const sendResults = async () => {
    try {
      message.loading({ content: 'Отправка результатов', key: 'send-res'})
      const minutesHave = moment.duration(location?.state?.limit).hours() * 60 + moment.duration(location?.state?.limit).minutes();
      const minutesLeft = moment.duration(timeLeft).hours() * 60 + moment.duration(timeLeft).minutes();
      const score = (test.questions.map(el => el.answers.every(item => item.isRight === item.selected)).filter(el => el).length / testLength * 100).toFixed(1);
      const elapsedTime = +minutesHave - +minutesLeft + ':' + addZero(+moment.duration(location?.state?.limit).seconds() || 60 - +moment.duration(timeLeft).seconds());
      console.log(elapsedTime);
      const result = {...test, score: score, elapsedTime: elapsedTime, name: userState.name, group: userState.group, lastName: userState.lastName }
      await db.collection('sessions').doc(sessionId).collection('attempts').doc(userState.uid).set(result);
      message.success({ content: 'Результаты успешно отправлены', key: 'send-res'})
      history.push('/tests');
    } catch (e) {
      message.error({ content: 'Ошибка.', key: 'send-res'})
    }
  }

  const confirmSending = () => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content: 'Отправив результат теста вы не сможете изменить его в будущем. Учитель получит детальную информацию о ходе прохождения теста. Вы действительно хотите отправить результаты прохождения?',
      okText: 'Да.',
      cancelText: 'Нет.',
      onOk() {
        sendResults();
      },
    });
  }

  const markAnswer = (question, answer, index) => {
    const _test = {...test};
    if (question.multiselection) {
      question.answers = question.answers.map((el, idx) => {
        if (idx === index) {
          return {...el, selected: !el.selected}
        }
        return el;
      })
    } else {
      question.answers = question.answers.map((el, idx) => {
        if (idx === index) {
          return {...el, selected: !el.selected}
        }
        return {...el, selected: false};
      })
    }
    setTest(_test);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(limit - Date.now());
    }, 500);
    return () => {
      clearInterval(interval);
    }
  }, [])

  if (!test) { 
    return <Redirect to='/' /> 
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