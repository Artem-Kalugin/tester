import React from 'react';
import s from './AdminPanel.module.scss';
import {} from 'antd';
import { Menu } from 'antd';
import { UnorderedListOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

const AdminSidebar = props => {
  return (
    <div className={`${s.wrapper} shadow-small`}>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline">
        <SubMenu key="sub1" icon={<UnorderedListOutlined />} title="Тесты">
          <Menu.ItemGroup key="g1" title="Сессии">
            <Menu.Item key="1">
              <Link to={`${props.matchUrl}`}>Активные сессии</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={`${props.matchUrl}/add-session`}>
                Добавление сессии
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup key="g2" title="Тесты">
            <Menu.Item key="3">
              <Link to={`${props.matchUrl}/add-test`}>Новый тест</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={`${props.matchUrl}/delete-test`}>Удаление теста</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Студенты">
          <Menu.Item key="5">Просмотр</Menu.Item>
          <Menu.Item key="6">
            <Link to={`${props.matchUrl}/add-students`}>
              Регистрация студентов
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default AdminSidebar;
