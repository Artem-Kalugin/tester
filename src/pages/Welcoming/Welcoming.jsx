import React from 'react';
import s from './Welcoming.module.scss';
import image from '../../assets/welcoming.svg';
import { Typography, space, Space, Input, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import EmaiQuestions from '../../components/EmaiQuestions/EmaiQuestions';

const { Title, Text } = Typography;
const Welcoming = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.imageWrapper}>
        <img src={image}></img>
      </div>
      {/* <EmaiQuestions
        obj={JSON.parse(
          `{"score":"0.0","questions":[{"multiselection":false,"question":"question5","answers":[{"answer":"answer","selected":false,"isRight":false},{"selected":false,"isRight":true,"answer":"answer"},{"selected":true,"isRight":false,"answer":"answer"}]},{"answers":[{"isRight":false,"selected":true,"answer":"answer"}],"question":"question4","multiselection":false},{"question":"question3","answers":[{"isRight":false,"answer":"answer"},{"answer":"answer","isRight":true},{"answer":"answer","selected":true,"isRight":false},{"answer":"answer","isRight":false}],"multiselection":true},{"answers":[{"selected":false,"answer":"answer","isRight":false},{"answer":"answer","selected":false,"isRight":true},{"selected":false,"isRight":false,"answer":"answer"},{"isRight":false,"answer":"answer","selected":false},{"answer":"answer","selected":true,"isRight":false}],"question":"question6","multiselection":false},{"question":"question7","multiselection":false,"answers":[{"selected":false,"answer":"answer","isRight":false},{"answer":"answer","isRight":false,"selected":false},{"selected":true,"isRight":false,"answer":"answer"}]},{"question":"question","multiselection":true,"answers":[{"answer":"answer","isRight":false},{"isRight":true,"answer":"answer"},{"answer":"answer","isRight":true,"selected":true}]}],"group":"863102","name":"Артем","elapsedTime":"1:15","lastName":"Калугин","studentId":"6oDhlqQV0yU2FOLiESfPD0Qs9O22"}`,
        )}
      /> */}
      <Space direction="vertical">
        <Title level={2}> Привет! </Title>
        <Text>Для того чтобы начать введите ссылку на тест</Text>
        <div
          className={
            props.inputFocused ? s.inputWrapperFocused : s.inputWrapper
          }>
          <Input
            onFocus={() => {
              props.setInputFocused(true);
            }}
            onBlur={() => {
              props.setInputFocused(false);
            }}
            className={props.inputFocused ? s.blueIcon : null}
            bordered={false}
            suffix={<RightOutlined />}
            placeholder="Ссылка"
          />
        </div>
        <Text>Или</Text>
        <Link to="/tests">
          <Button type="primary" shape="round">
            Перейти к тестам
            <RightOutlined />
          </Button>
        </Link>
      </Space>
    </div>
  );
};

export default Welcoming;
