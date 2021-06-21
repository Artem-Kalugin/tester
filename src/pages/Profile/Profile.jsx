import React from 'react';
import s from './Profile.module.scss';
import {} from 'antd';
import { Typography, space, Space, Input, Button, Formn } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import EmaiQuestions from '../../components/EmaiQuestions/EmaiQuestions';

const { Title, Text } = Typography;

const Profile = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={`${s.container} `}>
        <Space class={`${s.block} shadow-large`} direction="vertical">
          <Typography.Title>Смена пароля</Typography.Title>

          <Input
            onChange={e => {
              props.setOldPassword(e.target.value);
            }}
            value={props.oldPassword}
            placeholder="Текущий пароль"
          />

          <Input
            onChange={e => {
              props.setNewPassword(e.target.value);
            }}
            value={props.newPassword}
            placeholder="Новый пароль"
          />

          <Input
            onChange={e => {
              props.setRepeatPassword(e.target.value);
            }}
            value={props.repeatPassword}
            placeholder="Повторите новый пароль"
          />
          <Button
            loading={props.changePasswordLoading}
            onClick={() => {
              props.changePassword();
            }}
            type="primary">
            Сменить пароль
          </Button>
        </Space>
        <Space class={`${s.block} shadow-large`} direction="vertical">
          <Typography.Title>Смена почты</Typography.Title>
          <Input
            onChange={e => {
              props.setPassword(e.target.value);
            }}
            value={props.password}
            placeholder="Текущий пароль"
          />
          <Input
            onChange={e => {
              props.setEmail(e.target.value);
            }}
            value={props.email}
            placeholder="Новая почта"
          />
          <Button
            loading={props.changeEmailLoading}
            onClick={() => {
              props.changeEmail();
            }}
            type="primary">
            Сменить почту
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default Profile;
