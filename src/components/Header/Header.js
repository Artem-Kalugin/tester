import React from 'react';
import s from './Header.module.scss';
import { Button, Menu } from 'antd';

const Header = props => {
  return (
    <div className={`${s.wrapper} shadow-small`}>

      <a>
        Tester
      </a>
      <Menu className={s.menu} mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="4">Приветствие</Menu.Item>
        <Menu.Item key="1">Тесты</Menu.Item>
        <Menu.Item key="2">Админ Панель</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;