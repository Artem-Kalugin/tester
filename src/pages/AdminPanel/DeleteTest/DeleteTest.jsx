import React from 'react';
import s from './DeleteTest.module.scss';
import { Typography, Select, Button, Space } from 'antd';

const { Option } = Select;

const DeleteTest = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Space direction="vertical">
        <Typography.Title level={2}>Удаление теста</Typography.Title>
        <Select
          showSearch
          placeholder="Выберите или введите название теста"
          optionFilterProp="children">
          <Option value="jack">Тест 1</Option>
          <Option value="lucy">2</Option>
          <Option value="tom">3</Option>
        </Select>
        <Button type="primary">Удалить</Button>
      </Space>
    </div>
  );
};

export default DeleteTest;
