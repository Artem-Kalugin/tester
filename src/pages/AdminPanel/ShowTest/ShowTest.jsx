import React from 'react';
import s from './ShowTest.module.scss';
import { Button, Select, Space, Spin, Typography } from 'antd';
import { Option } from 'antd/lib/mentions';
import { EmaiQuestions } from '../../../components';

const ShowTest = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Typography.Title level={2}>Просмотр теста</Typography.Title>
      {props.fetched ? (
        <Space className={s.selector} direction="vertical">
          <Select
            value={props.selectedTest}
            onChange={value => {
              props.setSelectedTest(value);
            }}
            className={s.select}
            style={{ width: 360 }}
            showSearch
            placeholder="Выберите или введите название теста"
            optionFilterProp="children">
            {props.tests?.length
              ? props.tests.map(el => {
                  return (
                    <Option key={el.uid} value={el.uid}>
                      {el.name}
                    </Option>
                  );
                })
              : null}
          </Select>
          {props.selectedTest ? (
            <EmaiQuestions
              seeResults={true}
              emailing={false}
              obj={props.tests.find(el => el.uid === props.selectedTest)}
            />
          ) : null}
        </Space>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default ShowTest;
