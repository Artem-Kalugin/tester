import React, { useState, useEffect } from 'react';
import ShowStudents from './ShowStudents';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Modal, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const ShowStudentsContainer = props => {
  const db = firebase.firestore();
  const [data, setData] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

  const organizeData = (groups, students) => {
    let lastGroup = '';
    const data = [];
    students.forEach(el => {
      if (el.group !== lastGroup) {
        data.push({
          ...groups.find(item => item.group === el.group),
          type: 'group',
        });
        lastGroup = el.group;
      }
      data.push(el);
    });
    return data;
  };

  const confirmDeleteStudent = student => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content: 'Вы действительно хотите удалить студента?',
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        deleteStudent(student);
      },
    });
  };

  const confirmDeleteGroup = group => {
    Modal.confirm({
      title: 'Внимание',
      icon: <ExclamationCircleOutlined />,
      content:
        'Вы действительно хотите удалить всю группу? Данное действие так же сделает все инвайт коды для данной группы неактивными',
      okText: 'Да',
      cancelText: 'Нет',
      onOk() {
        deleteGroup(group);
      },
    });
  };

  const deleteStudent = async student => {
    try {
      message.loading({ content: 'Идет удаление', key: 'add-session' });
      await db
        .collection('users')
        .doc(student.uid)
        .set({
          ...student,
          notDeleted: false,
        });
      await db
        .collection('groups')
        .where('group', '==', student.group)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              ...doc.data(),
              studentAmount: firebase.firestore.FieldValue.increment(-1),
            });
          });
        });
      getGroups();
      message.success({ content: 'Успешно', key: 'add-session' });
    } catch (error) {}
  };

  const deleteGroup = async group => {
    try {
      message.loading({ content: 'Идет удаление', key: 'add-session' });
      await db
        .collection('users')
        .where('group', '==', group.group)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.set({
              ...doc.data(),
              notDeleted: false,
            });
          });
        });
      await db.collection('groups').doc(group.uid).delete();
      message.success({ content: 'Успешно', key: 'add-session' });
      getGroups();
    } catch (error) {}
  };

  useEffect(() => {
    getGroups();
  }, 0);

  const getGroups = async () => {
    try {
      const groups = [];
      await db
        .collection('groups')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            groups.push({
              uid: doc.id,
              ...doc.data(),
            });
          });
        });
      setGroups(groups);
      const students = [];
      await db
        .collection('users')
        .where('notDeleted', '==', true)
        .orderBy('group', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const _data = doc.data();
            if (_data.role === 'student') {
              students.push({
                uid: doc.id,
                ..._data,
              });
            }
          });
        });
      setStudents(students);
      setData(organizeData(groups, students));
      setFetched(true);
    } catch (error) {}
  };

  return (
    <ShowStudents
      deleteStudent={confirmDeleteStudent}
      deleteGroup={confirmDeleteGroup}
      fetched={fetched}
      data={data}
      {...props}
    />
  );
};

export default ShowStudentsContainer;
