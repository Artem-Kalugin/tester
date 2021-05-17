import React from 'react';
import s from './AddSession.module.scss';
import { Typography, Spin } from 'antd';
import {
  Form,
  Button,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
} from 'antd';
import moment from 'moment';

const { Option } = Select;

const layout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 10, span: 16 },
};

const AddSession = props => {
  console.log(props);
  return (
    <div className={`${s.wrapper}`}>
      {props.testsFetched && props.groupsFetched ? (
        <>
          <Typography.Title level={2}>Добавление сессии</Typography.Title>
          <div className={s.formContainer}>
            <div className={s.centerer}>
              <Form
                {...layout}
                layout="horizontal"
                name="addTest"
                onFinish={params => props.addSession(params)}
                initialValues={{
                  attemptTime: moment('01:00', 'HH:mm'),
                }}
                requiredMark={false}>
                <Form.Item
                  label="Тест"
                  name="testId"
                  style={{ width: '100%' }}
                  rules={[{ required: true, message: '' }]}>
                  <Select showSearch placeholder="Выберите тест">
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
                </Form.Item>
                <Form.Item
                  label="Группы"
                  name="groups"
                  rules={[{ required: true, message: '' }]}>
                  <Select
                    mode="multiple"
                    allowClear
                    placeholder="Выберите для каких групп тест">
                    {props.groups?.length
                      ? props.groups.map(el => {
                          return (
                            <Option key={el.uid} value={el.group}>
                              {el.group}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Действителен"
                  name="date"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}>
                  <DatePicker
                    disabledDate={d => !d || d.isBefore(new Date())}
                    showTime
                    placeholder="Дата и время"
                  />
                </Form.Item>
                <Form.Item
                  label="Ограничение времени"
                  name="attemptTime"
                  rules={[
                    {
                      required: true,
                      message: '',
                    },
                  ]}>
                  <TimePicker
                    format="HH:mm"
                    placeholder="Выберите длительность попытки"
                  />
                </Form.Item>

                <Form.Item {...tailLayout}>
                  <Button
                    loading={props.loading}
                    type="primary"
                    htmlType="submit">
                    Добавить
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default AddSession;
