import React, { useState } from 'react';
import s from './Header.module.scss';
import { Button, Menu, Dropdown } from 'antd';
import logo from '../../assets/logo192.png';
import { UserOutlined } from '@ant-design/icons';
import { Link, useLocation, NavLink } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useSelector } from 'react-redux';

const profileDropdown = (
  <Menu>
    <Menu.Item>
      <NavLink to="/profile">Настройки</NavLink>
    </Menu.Item>
    <Menu.Item>
      <a
        onClick={async () => {
          await firebase.auth().signOut();
        }}>
        Выйти из профиля
      </a>
    </Menu.Item>
  </Menu>
);

const Header = props => {
  const [selected, setSelected] = useState('1');
  const { pathname } = useLocation();
  const userState = useSelector(store => store);
  const parentPage = pathname.split('/')[1] || '/';

  return (
    <div className={`${s.wrapper}`}>
      <div className={s.logoWrapper}>
        <Link to="/" className={s.logo}>
          <img className={s.logoImg} src={logo} />
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
        {userState.role !== 'admin' ? (
          <Menu.Item key="tests">
            <Link to="/tests">Тесты</Link>
          </Menu.Item>
        ) : null}
        {userState.role === 'admin' ? (
          <Menu.Item key="admin">
            <Link to="/admin">Админ Панель</Link>
          </Menu.Item>
        ) : null}
      </Menu>
      <Dropdown
        className={s.profile}
        overlay={profileDropdown}
        placement="bottomLeft">
        <Button type={'text'} icon={<UserOutlined />}>
          {userState.name} {userState.lastName}
        </Button>
      </Dropdown>
    </div>
  );
};

export default Header;
