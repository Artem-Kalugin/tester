import React from 'react';
import s from './Sessions.module.scss';
import { Typography, Table, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
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

const parseTime = (seconds, timeLimit) => {
  const parser = moment.duration(seconds);
  const weeks = parser.asWeeks();
  const days = parser.asDays();
  const hours = parser.asHours();
  const minutes = parser.asMinutes();
  const limiter = moment(timeLimit, 'HH:mm');
  if (seconds < limiter.format('HH') * 3600 + limiter.format('mm') * 60)
    return 'Завершен';
  if (seconds < 0) return 'Скоро завершится';
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

const Sessions = props => {
  let data = [];

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
      render: (date, obj) => {
        const time = moment(date).diff(moment(new Date()));
        return (
          <Typography.Text>{parseTime(time, obj.attemptTime)}</Typography.Text>
        );
      },
    },
    {
      title: 'Всего проходят',
      dataIndex: 'studentsAmount',
      key: 'studentsAmount',
    },
    {
      title: 'Завершили прохождение',
      dataIndex: 'attemptsLength',
      key: 'attemptsLength',
    },
    {
      title: 'Детализация',
      dataIndex: 'attempts',
      key: 'attempts',
      render: attempts => {
        if (attempts?.length) {
          return (
            <EyeOutlined
              onClick={() => props.showModal(attempts)}
              style={{ color: 'blue' }}
            />
          );
        }
        return null;
      },
    },
  ];

  if (props.sessions?.length) {
    data = [...props.sessions];
    data.sort((a, b) => {
      if (moment(a.date).isAfter(moment(b.date))) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  return (
    <div className={`${s.wrapper}`}>
      <Modal
        title="Basic Modal"
        visible={props.showDetails}
        onOk={() => props.setShowDetails(false)}
        onCancel={() => props.setShowDetails(false)}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Typography.Title level={2}>Просмотр сессий</Typography.Title>
      <Table columns={columns} dataSource={data} className={s.table} />
    </div>
  );
};

export default Sessions;
