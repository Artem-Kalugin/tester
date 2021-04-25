import React, { useState } from 'react';
import s from './Registration.module.scss';
import { Typography, Space, Button, Input, Form, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const Registration = props => {
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
              <Input placeholder="Почта" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
              ]}>
              <Input placeholder="Пароль" />
            </Form.Item>
            <Form.Item
              name="passRepeat"
              rules={[
                { required: true, message: 'Пожалуйста, введите пароль!' },
              ]}>
              <Input placeholder="Повторите пароль" />
            </Form.Item>

            <Form.Item {...layout}>
              <Space align="start" size="small" direction="vertical">
                <Typography.Text type="secondary" strong>
                  Ваше имя:{' '}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                  Ваша фамилия:{' '}
                </Typography.Text>
                <Typography.Text type="secondary" strong>
                  Ваша группа:{' '}
                </Typography.Text>
              </Space>
            </Form.Item>

            <Form.Item>
              <Space direction="horizontal">
                <Button type="primary">Зарегистрироваться</Button>
                <Button>Авторизация</Button>
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
                <Button>Авторизация</Button>
              </Space>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Registration;
