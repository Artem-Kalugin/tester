import React from 'react';
import s from './ActiveSessions.module.scss';
import { Typography, Table } from 'antd';
import moment from 'moment';

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

const parseTime = seconds => {
  const parser = moment.duration(seconds);
  const weeks = parser.asWeeks();
  const days = parser.asDays();
  const hours = parser.asHours();
  const minutes = parser.asMinutes();
  if (days > 7) {
    const date = Math.round(weeks);
    return date + ' ' + prettyCountyWord(date, 'неделя', 'недели', 'недель');
  } else if (days > 1) {
    return (
      Math.floor(days) +
      ' ' +
      prettyCountyWord(Math.floor(days), 'день', 'дня', 'дней') +
      ' ' +
      Math.floor(hours - Math.floor(days) * 24) +
      ' ' +
      prettyCountyWord(
        Math.floor(hours - Math.floor(days) * 24),
        'час',
        'часа',
        'часов',
      )
    );
  } else {
    return (
      Math.floor(hours) +
      ' ' +
      prettyCountyWord(Math.floor(hours), 'час', 'часа', 'часов') +
      ' ' +
      Math.floor(minutes - Math.floor(hours) * 60) +
      ' ' +
      prettyCountyWord(
        Math.floor(minutes - Math.floor(hours) * 60),
        'минута',
        'минуты',
        'минут',
      )
    );
  }
};

const columns = [
  {
    title: 'Тест',
    dataIndex: 'test',
    key: 'test',
  },
  {
    title: 'Доступно для ',
    dataIndex: 'groups',
    key: 'groups',
    render: openedTo => {
      return openedTo.map((el, index) => (
        <Typography.Text key={el}>
          {index ? ', ' : null}
          {el}
        </Typography.Text>
      ));
    },
  },
  {
    title: 'Оставшееся время',
    dataIndex: 'date',
    key: 'date',
    render: date => {
      return (
        <Typography.Text>
          {parseTime(moment(date).diff(moment(new Date())))}
        </Typography.Text>
      );
    },
  },
];

const ActiveSessions = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Typography.Title level={2}>Активные сессии</Typography.Title>
      <Table
        columns={columns}
        dataSource={props.sessions}
        className={s.table}
      />
    </div>
  );
};

export default ActiveSessions;
