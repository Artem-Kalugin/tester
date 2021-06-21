import React from 'react';
import s from './EmaiQuestions.module.scss';
import { Typography, Space, Radio } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const renderAnswer = (answer, index, emailing, seeResults) => {
  return (
    <div>
      {answer.isRight ? (
        emailing ? (
          <span
            style={{
              color: answer.selected || seeResults ? 'green' : '#cccccc',
            }}>
            ✓
          </span>
        ) : (
          <CheckOutlined
            style={{
              color: answer.selected || seeResults ? 'green' : '#cccccc',
            }}
          />
        )
      ) : emailing ? (
        <span
          style={{ color: answer.selected || seeResults ? 'red' : '#cccccc' }}>
          ✕
        </span>
      ) : (
        <CloseOutlined
          style={{ color: answer.selected || seeResults ? 'red' : '#cccccc' }}
        />
      )}{' '}
      {!seeResults ? (
        <Radio disabled={emailing} checked={answer.selected}>
          {index + 1}. {answer.answer}
        </Radio>
      ) : (
        <span>
          {index + 1}. {answer.answer}
        </span>
      )}
    </div>
  );
};

const renderQuestion = (props, index, emailing, seeResults) => {
  return (
    <div
      style={
        emailing
          ? {
              fontSize: '16px',
              color: 'black',
              padding: '16px',
              marginTop: '24px',
              borderRadius: '10px',
              background: '#ffffff',
              bakgroundColor: '#ffffff',
              boxShadow: '-1px 7px 5px -6px rgba(0, 0, 0, 0.06)',
            }
          : null
      }
      className={`${s.question} shadow-small`}>
      <Typography.Title style={{ margin: 0 }} level={4}>
        {index + 1}. Вопрос: {props.question}
      </Typography.Title>
      <Typography.Text>Вес вопроса: {props.weight}</Typography.Text>
      {props.multiselection ? (
        <Typography.Text>
          Вы можете выбрать несколько вариантов ответа.
        </Typography.Text>
      ) : null}
      {props.answers?.length
        ? props.answers.map((answer, index) => {
            return renderAnswer(answer, index, emailing, seeResults);
          })
        : null}
    </div>
  );
};

const EmaiQuestions = ({ obj, emailing, seeResults }) => {
  return (
    <div
      style={
        emailing
          ? {
              fontSize: '20px',
              color: 'black',
              padding: '32px',
              background: '#f0f6fa',
              bakgroundColor: '#f0f6fa',
              width: '100%',
            }
          : null
      }
      className={`${s.wrapper}`}>
      <div className={s.title}>
        {obj.name && !seeResults ? (
          <Typography.Title style={{ margin: 0 }} level={3}>
            Тест {obj.testName} пройден {obj.name} {obj.lastName},{' '}
            {`группа ${obj.group}`}
          </Typography.Title>
        ) : null}
        <br />
        {obj.score ? (
          <Typography.Title style={{ margin: 0 }} level={4}>
            Процент прохождения: {obj.score}%, Затраченное время:{' '}
            {obj.elapsedTime}
          </Typography.Title>
        ) : null}
      </div>
      {obj.questions.length
        ? obj.questions.map((question, index) => {
            return renderQuestion(question, index, emailing, seeResults);
          })
        : null}
    </div>
  );
};

export default EmaiQuestions;
