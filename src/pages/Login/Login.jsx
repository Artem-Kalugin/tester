import React from 'react';
import s from './Login.module.scss';
import { Typography, Space, Button, Input, Form, Checkbox } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';

const Login = props => {
  const layout = {
    wrapperCol: { span: 40 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const history = useHistory();

  return (
    <div className={`${s.wrapper} + shadow-small`}>
      <div className={`${s.loginWrapper} + shadow-large`}>
        <Form {...layout}>
          <Form.Item {...layout}>
            <Typography.Title>Вход</Typography.Title>
          </Form.Item>
          <Form.Item
            name="login"
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
            <Input
              value={props.email}
              onChange={e => {
                props.setEmail(e.target.value);
              }}
              placeholder="Логин"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
            ]}>
            <Input
              value={props.password}
              onChange={e => {
                props.setPassword(e.target.value);
              }}
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item>
            <Space direction="horizontal">
              <Button
                onClick={() => {
                  props.signIn();
                }}
                type="primary">
                Войти
              </Button>
              <Button
                onClick={() => {
                  history.push('registration');
                }}>
                Регистрация
              </Button>
            </Space>
          </Form.Item>

          <Form.Item {...layout} name="remember" valuePropName="checked">
            <NavLink to="/password-restore">
              <Typography.Text>Забыли пароль?</Typography.Text>
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
