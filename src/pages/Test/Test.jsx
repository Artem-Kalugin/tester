import React from 'react';
import s from './Test.module.scss';
import { Drawer, Radio, Space, Tag, Typography, Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import moment from 'moment';

const addZero = value => {
  if (value < 10) return '0' + value;
  return value;
};

const Test = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.testWrapper}>
        <div className={`${s.testContainer} shadow-small`}>
          <LeftOutlined
            onClick={props.previousQuestion}
            className={`${s.iconSmall} ${
              props.questionIndex ? '' : s.iconDisabled
            }`}
          />
          <div className={s.testContent}>
            <div className={s.header}>
              <div className={s.title}>
                <Typography.Title style={{ margin: 0 }} level={3}>
                  {props.test.name} {props.questionIndex + 1}/
                  {props.test.questions.length}
                </Typography.Title>
              </div>
              <div className={s.icons}>
                <FieldTimeOutlined className={s.icon} />
                <span>
                  {addZero(moment.duration(props.timeLeft).minutes())}:
                  {addZero(moment.duration(props.timeLeft).seconds())}
                </span>
                <MenuOutlined
                  onClick={() => props.setShowDrawer(true)}
                  className={s.icon}
                />
              </div>
            </div>
            <div className={s.main}>
              <Typography.Text>
                {props.currentQuestion.question}
              </Typography.Text>
            </div>
            {props.currentQuestion.multiselection ? (
              <Typography.Text>
                Вы можете выбрать несколько вариантов ответа.
              </Typography.Text>
            ) : null}
            <div className={s.answers}>
              {props?.currentQuestion?.answers?.length
                ? props.currentQuestion.answers.map((el, index) => {
                    return (
                      <Radio
                        key={index}
                        checked={el.selected}
                        onClick={() =>
                          props.markAnswer(props.currentQuestion, el, index)
                        }>
                        {el.answer}
                      </Radio>
                    );
                  })
                : null}
            </div>
            <div className={s.footer}>
              {props.questionIndex === props.test.questions.length - 1 ? (
                <Button
                  disabled={
                    !props.test.questions
                      .map(el => el.answers.some(el => el.selected))
                      .flat()
                      .every(el => el)
                  }
                  onClick={props.sendResults}
                  type="secondary">
                  Отправить результаты
                </Button>
              ) : (
                <Button
                  onClick={props.nextQuestion}
                  disabled={
                    !props.currentQuestion.answers.filter(el => el.selected)
                      .length
                  }
                  type="primary">
                  Ответить
                </Button>
              )}
            </div>
          </div>
          <RightOutlined
            onClick={props.nextQuestion}
            className={`${s.iconSmall} ${
              props.questionIndex === props.test.questions.length - 1
                ? s.iconDisabled
                : ''
            }`}
          />
        </div>
      </div>
      <Drawer
        title="Список вопросов"
        placement="bottom"
        closable={true}
        height="auto"
        onClose={() => props.setShowDrawer(false)}
        visible={props.showDrawer}>
        <div>
          <Space wrap={true} size={3}>
            {props.test?.questions?.length
              ? props.test.questions.map((el, index) => {
                  const isPassed = el.answers.some(el => el.selected);
                  const isCurrent = index === props.questionIndex;
                  const color = isCurrent
                    ? 'blue-inverse'
                    : isPassed
                    ? 'processing'
                    : 'default';
                  return (
                    <Tag
                      key={el.index}
                      className={s.tag}
                      onClick={() => props.setCurrentQuestion(index)}
                      color={color}>
                      {index + 1}
                    </Tag>
                  );
                })
              : null}
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default Test;
