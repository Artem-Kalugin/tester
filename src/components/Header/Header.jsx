import React, { useState } from 'react';
import s from './Header.module.scss';
import { Button, Menu, Dropdown } from 'antd';
import logo from '../../assets/logo192.png';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const profileDropdown = (
  <Menu>
    <Menu.Item>
      <a>Настройки</a>
    </Menu.Item>
    <Menu.Item>
      <a>Выйти из профиля</a>
    </Menu.Item>
  </Menu>
);

const Header = props => {
  const [selected, setSelected] = useState('1');
  const { pathname } = useLocation();
  const parentPage = pathname.split('/')[1] || '/';

  return (
    <div className={`${s.wrapper}`}>
      <div className={s.logoWrapper}>
        <Link to="/" className={s.logo}>
          <img className={s.logoImg} src={logo}></img>
        </Link>
      </div>
      <Menu
        onClick={e => setSelected(e.key)}
        className={s.menu}
        mode="horizontal"
        selectedKeys={[parentPage]}>
        <Menu.Item key="/">
          <Link to="/">Приветствие</Link>
        </Menu.Item>
        <Menu.Item key="tests">
          <Link to="/tests">Тесты</Link>
        </Menu.Item>
        <Menu.Item key="admin">
          <Link to="/admin">Админ Панель</Link>
        </Menu.Item>
      </Menu>
      <Dropdown
        className={s.profile}
        overlay={profileDropdown}
        placement="bottomLeft">
        <Button type={'text'} icon={<UserOutlined />}>
          {' '}
          Профиль
        </Button>
      </Dropdown>
    </div>
  );
};

export default Header;
