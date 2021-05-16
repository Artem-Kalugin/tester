import React from 'react';
import s from './DeleteTest.module.scss';
import { Typography, Select, Button, Space, Spin } from 'antd';

const { Option } = Select;

const DeleteTest = props => {
  return (
    <div className={`${s.wrapper}`}>
      {props.fetched ? (
        <Space direction="vertical">
          <Typography.Title level={2}>Удаление теста</Typography.Title>
          <Select
            value={props.selectedTest}
            onChange={value => {
              props.setSelectedTest(value);
            }}
            style={{ width: 360 }}
            showSearch
            placeholder="Выберите или введите название теста"
            optionFilterProp="children">
            {props.tests?.length
              ? props.tests.map(el => {
                  return <Option value={el.uid}>{el.name}</Option>;
                })
              : null}
          </Select>
          <Button
            disabled={!props.selectedTest}
            onClick={props.deleteTest}
            type="primary">
            Удалить
          </Button>
        </Space>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default DeleteTest;
