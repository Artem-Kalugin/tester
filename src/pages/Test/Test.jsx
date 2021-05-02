import React from 'react';
import s from './Test.module.scss';
import { Drawer, Radio, Space, Tag, Typography, Button } from 'antd';
import {
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

const Test = props => {
  return (
    <div className={`${s.wrapper}`}>
      <div className={s.testWrapper}>
        <div className={`${s.testContainer} shadow-small`}>
          <LeftOutlined className={s.iconSmall} />
          <div className={s.testContent}>
            <div className={s.header}>
              <div className={s.title}>
                <Typography.Title style={{ margin: 0 }} level={3}>
                  Вопрос 1/2
                </Typography.Title>
              </div>
              <div className={s.icons}>
                <FieldTimeOutlined className={s.icon} />
                <span>12:00</span>
                <MenuOutlined
                  onClick={() => props.setShowDrawer(true)}
                  className={s.icon}
                />
              </div>
            </div>
            <div className={s.main}>
              <Typography.Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellendus consectetur et maxime labore odio facilis quas
                atque, distinctio a ipsam officiis natus fugit dolorem aut
                similique nemo necessitatibus sed accusamus. Lorem ipsum dolor
                sit amet, consectetur adipisicing elit. Repellendus consectetur
                et maxime labore odio facilis quas atque, distinctio a ipsam
                officiis natus fugit dolorem aut similique nemo necessitatibus
                sed accusamus. Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Repellendus consectetur et maxime labore odio
                facilis quas atque, distinctio a ipsam officiis natus fugit
                dolorem aut similique nemo necessitatibus sed accusamus.
              </Typography.Text>
            </div>
            <div className={s.answers}>
              <Radio>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellendus consectetur et maxime labore odio facilis quas
                atque, distinctio a ipsam officiis natus fugit dolorem aut
                similique nemo necessitatibus sed accusamus.
              </Radio>
              <Radio>1</Radio>
              <Radio>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Repellendus consectetur et maxime labore odio facilis quas
                atque, distinctio a ipsam officiis natus fugit dolorem aut
                similique nemo necessitatibus sed accusamus.
              </Radio>
              <Radio>1</Radio>
            </div>
            <div className={s.footer}>
              <Button type="primary">Ответить</Button>
            </div>
          </div>
          <RightOutlined className={s.iconSmall} />
        </div>
      </div>
      <Drawer
        title="Список вопросов"
        placement="bottom"
        closable={true}
        height="auto"
        onClose={() => props.setShowDrawer(false)}
        visible={props.showDrawer}>
        <div>
          <Space wrap={true} size={3}>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
            <Tag color="processing">2</Tag>
            <Tag color="processing">3</Tag>
            <Tag color="blue-inverse">4</Tag>
            <Tag color="default">5</Tag>
            <Tag>1</Tag>
          </Space>
        </div>
      </Drawer>
    </div>
  );
};

export default Test;
