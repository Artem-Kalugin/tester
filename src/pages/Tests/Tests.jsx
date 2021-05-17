import React from 'react';
import s from './Tests.module.scss';
import { Card, Typography, Space, Button, Spin } from 'antd';
import {
  QuestionOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const Tests = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.cardWrapper}>
        {props.data?.length ? (
          props.data.map((el, index) => {
            console.log(el);
            return (
              <Card key={index} hoverable className={s.card} title={el.title}>
                <Space direction={'vertical'}>
                  <Space>
                    <QuestionOutlined />
                    <Text>Количество вопросов: {el.questionsAmount}</Text>
                  </Space>
                  <Space>
                    <ClockCircleOutlined />
                    <Text>Ограничение: {el.timeLimit}</Text>
                  </Space>
                  <Space>
                    <CalendarOutlined />
                    <Text>Доступно до: {el.date}</Text>
                  </Space>
                  <Button
                    onClick={() => props.doTest(el.test, el.limit)}
                    className={s.button}
                    shape={'round'}
                    type={'primary'}>
                    Пройти
                  </Button>
                </Space>
              </Card>
            );
          })
        ) : (
          <Spin />
        )}
      </div>
    </div>
  );
};

export default Tests;
