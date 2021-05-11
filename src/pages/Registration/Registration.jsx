import React, { useState } from 'react';
import s from './Registration.module.scss';
import { Typography, Space, Button, Input, Form, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const Registration = props => {
  const history = useHistory();

  const layout = {
    wrapperCol: { span: 40 },
  };

  const [recieved, setRecieved] = useState(false);

  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.registrationWrapper} + shadow-large`}>
        {recieved ? (
          <Form>
            <Form.Item {...layout}>
              <Typography.Title>Регистрация</Typography.Title>
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Пожалуйста, введите вашу почту!' },
              ]}>
              <Input
                onChange={e => {
                  props.setEmail(e.target.value);
                }}
                value={props.email}
                placeholder="Почта"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
              ]}>
              <Input
                onChange={e => {
                  props.setPassword(e.target.value);
                }}
                value={props.password}
                placeholder="Пароль"
              />
            </Form.Item>
            <Form.Item
              name="passRepeat"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
              ]}>
              <Input
                onChange={e => {
                  props.setRepeatPassword(e.target.value);
                }}
                value={props.repeatPassword}
                placeholder="Повторите пароль"
              />
            </Form.Item>

            <Form.Item {...layout}>
              <Space align="start" size="small" direction="vertical">
                <Typography.Text type="secondary" strong>
                  Ваше имя: {props.data.name}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                  Ваша фамилия: {props.data.lastName}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                  Ваша группа: {props.data.group}
                </Typography.Text>
              </Space>
            </Form.Item>

            <Form.Item>
              <Space direction="horizontal">
                <Button
                  onClick={() => {
                    props.register();
                  }}
                  type="primary">
                  Зарегистрироваться
                </Button>
                <Button
                  onClick={() => {
                    history.push('/login');
                  }}>
                  Авторизация
                </Button>
              </Space>
            </Form.Item>
          </Form>
        ) : (
          <Form>
            <Form.Item {...layout}>
              <Typography.Title>Регистрация</Typography.Title>
            </Form.Item>
            <Form.Item
              name="id"
              rules={[
                { required: true, message: 'Пожалуйста, введите ваш id!' },
              ]}>
              <Input
                placeholder="Номер ученика"
                suffix={
                  <Tooltip title="Номер ученика для регистрации можно получить у преподователя">
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
              />
            </Form.Item>
            <Form.Item>
              <Space direction="horizontal">
                <Button
                  onClick={() => {
                    setRecieved(true);
                  }}
                  type="primary">
                  Продолжить
                </Button>
                <Button
                  onClick={() => {
                    history.push('/login');
                  }}>
                  Авторизация
                </Button>
              </Space>
            </Form.Item>
          </Form>
        )}
        {props.errorMessage ? (
          <Typography.Text type="danger">{props.errorMessage}</Typography.Text>
        ) : null}
      </div>
    </div>
  );
};

export default Registration;
