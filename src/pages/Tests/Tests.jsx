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
              <Card
                key={index}
                hoverable={typeof el.score === 'undefined'}
                className={`${s.card} + ${
                  typeof el.score !== 'undefined' ? s.passed : ''
                }`}
                title={el.title}>
                <Space direction={'vertical'}>
                  <Space>
                    <QuestionOutlined />
                    <Text>Количество вопросов: {el.questionsAmount}</Text>
                  </Space>
                  <Space>
                    <ClockCircleOutlined />
                    <Text>Ограничение: {el.timeLimit}</Text>
                  </Space>

                  {typeof el.score === 'undefined' ? (
                    <>
                      <Space>
                        <CalendarOutlined />
                        <Text>Доступно до: {el.date}</Text>
                      </Space>
                      <Button
                        onClick={() =>
                          props.doTest(el.test, el.limit, el.sessionId)
                        }
                        className={s.button}
                        shape={'round'}
                        type={'primary'}>
                        Пройти
                      </Button>
                    </>
                  ) : (
                    <Space>
                      <Text>Пройдено: {el.score}%</Text>
                    </Space>
                  )}
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
