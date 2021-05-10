import React from 'react';
import s from './AddTest.module.scss';
import { Upload, Button, Typography, Input, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddTest = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Space direction="vertical">
        <Typography.Title level={2}>Загрузка теста</Typography.Title>
        <Upload
          method={null}
          maxCount={1}
          beforeUpload={props.parse}
          listType="picture-card"
          {...props}>
          <div>
            {false ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <Input placeholder="Введите название теста"></Input>
        <div className={s.aligner}>
          <Typography.Text classNamee={s.text} type="secondary">
            Просмотреть тест
          </Typography.Text>
        </div>
        <Button type="primary">Загрузить</Button>
      </Space>
    </div>
  );
};

export default AddTest;
