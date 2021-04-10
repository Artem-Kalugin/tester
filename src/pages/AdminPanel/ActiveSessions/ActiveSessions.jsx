import React from 'react';
import s from './ActiveSessions.module.scss';
import { Typography, Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Тест',
    dataIndex: 'test',
    key: 'test',
  },
  {
    title: 'Доступно для ',
    dataIndex: 'openedTo',
    key: 'openedTo',
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
    dataIndex: 'remainingTime',
    key: 'remainingTime',
  },
  {
    title: 'Завершили',
    dataIndex: 'progress',
    key: 'progress',
  },
  {
    title: 'Средняя оценка',
    dataIndex: 'averageMark',
    key: 'averageMark',
  },
];

const testData = [
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
  {
    id: 1,
    test: 'Тест 1',
    openedTo: ['831943', 'name'],
    remainingTime: '1hr 30min',
    progress: '16/26',
    averageMark: '8.7',
  },
];

const ActiveSessions = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Typography.Title level={2}>Активные сессии</Typography.Title>
      <Table columns={columns} dataSource={testData} className={s.table} />
    </div>
  );
};

export default ActiveSessions;
