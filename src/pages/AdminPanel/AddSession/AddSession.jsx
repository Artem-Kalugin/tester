import React from 'react';
import s from './AddSession.module.scss';
import { Typography } from 'antd';
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
  labelCol: { span: 8 },
  wrapperCol: { span: 20 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const AddSession = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.formContainer}>
        <Typography.Title level={2}>Добавление сессии</Typography.Title>
        <div className={s.centerer}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            requiredMark={false}>
            <Form.Item
              label="Тест"
              name="Test"
              rules={[
                { required: true, message: 'Пожалуйста, выберите тест. ' },
              ]}>
              <Select
                showSearch
                placeholder="Выберите тест"
                optionFilterProp="children">
                <Option value="jack">Тест 1</Option>
                <Option value="lucy">2</Option>
                <Option value="tom">3</Option>
              </Select>
            </Form.Item>

            <Form.Item name="try" label="Попытки">
              <InputNumber min={1} defaultValue={1} />
            </Form.Item>

            <Form.Item
              label="Группы"
              name="password"
              rules={[
                { required: true, message: 'Пожалуйста, введите группы.' },
              ]}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Выберите для каких групп тест">
                <Option value="lucy">102</Option>
                <Option value="tom">103</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Действителен до"
              name="availabelDate"
              rules={[
                {
                  required: true,
                  message:
                    'Пожалуйста, введите дату до которой будет действителен тест.',
                },
              ]}>
              <DatePicker />
              <TimePicker
                defaultValue={moment('00:00', 'HH:mm')}
                format="HH:mm"
              />
            </Form.Item>
            <Form.Item
              label="Время попытки"
              name="availabelDate"
              rules={[
                {
                  required: true,
                  message: 'Пожалуйста, введите время прохождения теста.',
                },
              ]}>
              <TimePicker
                defaultValue={moment('01:00', 'HH:mm')}
                format="HH:mm"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Добавить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddSession;
