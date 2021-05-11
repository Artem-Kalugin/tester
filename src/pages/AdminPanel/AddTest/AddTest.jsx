import React from 'react';
import s from './AddTest.module.scss';
import { Upload, Button, Typography, Input, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddTest = props => {
  console.log(props);
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
        <Input
          value={props.name}
          onChange={e => props.setName(e.target.value)}
          placeholder="Введите название теста"
        />
        <div className={s.aligner}>
          <Typography.Text className={s.text} type="secondary">
            Просмотреть тест
          </Typography.Text>
        </div>
        <Button
          onClick={props.upload}
          disabled={!(props.preparedData && props.name)}
          type="primary">
          Загрузить
        </Button>
      </Space>
    </div>
  );
};

export default AddTest;
