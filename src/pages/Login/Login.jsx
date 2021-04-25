import React from 'react';
import s from './Login.module.scss';
import { Typography, Space, Button, Input, Form, Checkbox } from 'antd';

const Login = props => {
  const layout = {
    wrapperCol: { span: 40 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

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
            <Input placeholder="Логин" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
            ]}>
            <Input placeholder="Пароль" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>

          <Form.Item>
            <Space direction="horizontal">
              <Button type="primary">Войти</Button>
              <Button>Регистрация</Button>
            </Space>
          </Form.Item>

          <Form.Item {...layout} name="remember" valuePropName="checked">
            <Typography.Text>Забыли пароль?</Typography.Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
