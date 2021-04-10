import React from 'react';
import s from './Welcoming.module.scss';
import image from '../../assets/welcoming.svg';
import { Typography, space, Space, Input, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;
const Welcoming = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.imageWrapper}>
        <img src={image}></img>
      </div>
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
