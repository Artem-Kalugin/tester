import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router';
import Test from './Test';

const TestContainer = props => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currQuestion, setCurrQuestion] = useState(0);
  const location = useLocation();
  const [test, setTest] = useState(location?.state?.test);
  const [timeLeft, setTimeLeft] = useState();
  const [limit] = useState(Date.now() + location?.state?.limit);
  const [testLength] = useState(location?.state?.test?.questions?.length);

  const nextQuestion = () => {
    setCurrQuestion(old => old < (testLength - 1) ? old + 1 : old);
  }

  const previousQuestion = () => {
    setCurrQuestion(old => old > 0 ? old - 1: old);
  }

  const setCurrentQuestion = (value) => {
    setCurrQuestion(value);
  }

  const markAnswer = (el, index) => {
    const newTest = {...test};
    if (el.multiselection) {
      if (el.answer?.length) {
        if (el.answer.includes(index)) {
          el.answer = el.answer.filter((el) => el !== index);
        } else {
          el.answer.push(index);
        }
      } else {
        el.answer = [index];
      }
    } else {
      el.answer = index
    }
    setTest(newTest);
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