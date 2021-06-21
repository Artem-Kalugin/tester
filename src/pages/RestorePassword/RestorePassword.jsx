import React from 'react';
import s from './RestorePassword.module.scss';
import { Typography, Space, Button, Input, Form, Checkbox } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';

const layout = {
  wrapperCol: { span: 40 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const RestorePassword = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.loginWrapper} + shadow-large`}>
        <Form {...layout}>
          <Form.Item {...layout}>
            <Typography.Title>Восстановление</Typography.Title>
          </Form.Item>
          <Form.Item
            name="Почтовый адрес"
            rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}>
            <Input
              value={props.email}
              onChange={e => {
                props.setEmail(e.target.value);
              }}
              placeholder="Введите email"
            />
          </Form.Item>
          <Form.Item>
            <Space direction="horizontal">
              <Button
                disabled={!props.email}
                onClick={() => {
                  props.sendEmail();
                }}
                type="primary">
                Отправить письмо для восстановления
              </Button>
            </Space>
          </Form.Item>
          <Form.Item {...layout} name="remember" valuePropName="checked">
            <NavLink to="/login">
              <Typography.Text>Назад</Typography.Text>
            </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RestorePassword;
