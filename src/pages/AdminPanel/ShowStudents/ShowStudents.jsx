import React from 'react';
import s from './ShowStudents.module.scss';
import { Spin, Table, Typography, Tooltip } from 'antd';
import {
  CloseOutlined,
  EyeOutlined,
  MailOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const ShowStudents = props => {
  const details = [
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Почта',
      dataIndex: 'email',
      key: 'email',
    },
    {
      dataIndex: 'questions',
      key: 'questions',
      render: (score, obj) => {
        return (
          <>
            <Tooltip
              title={`Удалить ${obj.type === 'group' ? 'группу' : 'студента'}`}>
              <CloseOutlined
                style={{ color: 'red', fontSize: '18px' }}
                onClick={() => {
                  obj.type === 'group'
                    ? props.deleteGroup(obj)
                    : props.deleteStudent(obj);
                }}
              />
            </Tooltip>{' '}
          </>
        );
      },
    },
  ];

  return (
    <div className={s.wrapper}>
      <Typography.Title level={2}>Просмотр студентов</Typography.Title>
      {props.fetched ? (
        <Table className={s.table} columns={details} dataSource={props.data} />
      ) : (
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Spin />
        </div>
      )}{' '}
    </div>
  );
};

export default ShowStudents;
