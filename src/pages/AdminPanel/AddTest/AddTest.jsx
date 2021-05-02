import React from 'react';
import s from './AddTest.module.scss';
import { Upload, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AddTest = props => {
  return (
    <div className={`${s.wrapper}`}>
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
    </div>
  );
};

export default AddTest;
