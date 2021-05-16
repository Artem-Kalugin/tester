import React from 'react';
import s from './AddStudents.module.scss';
import {} from 'antd';
import { Upload, Button, Typography, Space } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddStudents = props => {
  return (
    <div className={`${s.wrapper}`}>
      <Space direction="vertical">
        <Typography.Title level={2}>Добавление студентов</Typography.Title>
        <Upload
          method={null}
          maxCount={1}
          beforeUpload={props.parse}
          listType="picture-card"
          {...props}>
          <div>{false ? <LoadingOutlined /> : <PlusOutlined />}</div>
        </Upload>
        <div className={s.aligner}>
          <Typography.Text className={s.text} type="secondary">
            Загрузите CSV файл в формате Имя, Фамилия, Группа
          </Typography.Text>
        </div>
        <Button
          onClick={props.upload}
          disabled={!props.preparedData}
          loading={props.loading}
          type="primary">
          Загрузить новые инвайт коды
        </Button>
        <Button
          onClick={props.copyToClipboard}
          disabled={!props.result?.length}>
          Скопировать инвайт коды в буффер обмена
        </Button>
        <Button
          onClick={props.getWholeInviteCodes}
          loading={props.loadingActiveInvites}>
          Получить инвайт коды для всех незарегистирированных студентов
        </Button>
      </Space>
    </div>
  );
};

export default AddStudents;
