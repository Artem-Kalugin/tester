import React from 'react';
import s from './TestResults.module.scss';
import {} from 'antd';
import { EmaiQuestions } from '../../components';

const TestResults = props => {
  return (
    <div className={`${s.wrapper}`}>
      {props.obj ? <EmaiQuestions obj={props.obj}></EmaiQuestions> : null}
    </div>
  );
};

export default TestResults;
