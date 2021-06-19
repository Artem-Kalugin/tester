import React from 'react';
import s from './Tests.module.scss';
import { Card, Typography, Space, Button, Spin, Menu } from 'antd';
import {
  QuestionOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

const { Meta } = Card;
const { Text } = Typography;

const Tests = props => {
  const getClassName = (score, isTooLate) => {
    if (isTooLate) {
      return s.late;
    } else if (typeof score !== 'undefined') {
      return s.passed;
    }
  };
  const renderTests = data => {
    return data?.length
      ? data.map((el, index) => {
          return (
            <Card
              key={index}
              hoverable={typeof el.score === 'undefined'}
              className={`${s.card} + ${getClassName(el.score, el.isTooLate)}`}
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
                <Space>
                  <CalendarOutlined />
                  <Text>Доступно до: {el.date}</Text>
                </Space>
                {typeof el.score === 'undefined' ? (
                  <Button
                    onClick={() =>
                      props.doTest(
                        el.test,
                        el.limit,
                        el.sessionId,
                        el.unformattedDate,
                      )
                    }
                    className={s.button}
                    shape={'round'}
                    type={'primary'}>
                    Пройти
                  </Button>
                ) : el.isTooLate ? (
                  <Space>
                    <Text>Просрочен</Text>
                  </Space>
                ) : (
                  <Space>
                    <Text>Пройдено: {el.score}%</Text>
                  </Space>
                )}
              </Space>
            </Card>
          );
        })
      : null;
  };

  console.log(props);
  return (
    <div className={s.mainWrapper}>
      <Menu style={{ width: 230 }} defaultSelectedKeys={['0']} mode="inline">
        <Menu.Item onClick={() => props.setMode('all')} key="0">
          Все тесты
        </Menu.Item>
        <Menu.Item onClick={() => props.setMode('active')} key="1">
          Активные тесты
        </Menu.Item>
        <Menu.Item onClick={() => props.setMode('passed')} key="2">
          Пройденные тесты
        </Menu.Item>
        <Menu.Item onClick={() => props.setMode('inactive')} key="3">
          Просроченные тесты
        </Menu.Item>
      </Menu>
      <div className={`${s.wrapper}`}>
        <div className={s.cardWrapper}>
          {props.initialized ? (
            [
              props.mode === 'active' || props.mode === 'all'
                ? renderTests(props.activeTests)
                : null,
              props.mode === 'passed' || props.mode === 'all'
                ? renderTests(props.passedTests)
                : null,
              props.mode === 'inactive' || props.mode === 'all'
                ? renderTests(props.inactiveTests)
                : null,
            ]
          ) : (
            <Spin />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tests;
