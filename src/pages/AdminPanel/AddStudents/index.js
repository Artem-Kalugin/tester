import React, { useState } from 'react';
import AddStudents from './AddStudents';
import * as csv from 'csvtojson';
import firebase from 'firebase/app';
import { message } from 'antd';
import 'firebase/auth';
import 'firebase/firestore';

const AddStudentsContainer = props => {
  const [preparedData, setPreparedData] = useState();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingActiveInvites, setLoadingActiveInvites] = useState(false);

  const db = firebase.firestore();

  const parse = async file => {
    try {
      const data = await csv({
        noheader: true,
        trim: true,
        headers: ['name', 'lastName', 'group'],
      }).fromString(await file.text());
      if (!validate(data)) {
        throw 'wrong-format';
      }
      setPreparedData(parseData(data));
    } catch (e) {
      if (e === 'wrong-format') {
        message.error('Файл неправильно отформатирован');
      } else {
        message.error('Произошла ошибка при обработке файла, попробуйте позже');
      }
    }
    return false;
  };

  const getWholeInviteCodes = async () => {
    setLoadingActiveInvites(true);
    try {
      message.loading({ content: 'Loading...', key: 'add-student' });
      const addInvitation = await db.collection('invites').get();
      const _result = addInvitation.docs.map((doc, index) => {
        const el = doc.data();
        return `${index + 1}.\t${el.group}\t${el.name}\t${el.lastName}\t${
          el.inviteCode
        }\n`;
      });
      writeResultsToClipboard(_result.join('\n'));
      message.success({ content: 'Успешно', key: 'add-student' });
    } catch (e) {
      message.error({
        content: 'Кажется, что-то пошло не так',
        key: 'add-student',
      });
    }
    setLoadingActiveInvites(false);
  };

  const upload = async () => {
    setLoading(true);
    try {
      message.loading({ content: 'Loading...', key: 'add-student' });
      const groupsFetched = await db.collection('groups').get();
      const groups = groupsFetched?.docs?.map(el => {
        return el.data();
      });
      const newGroups = [];
      const _result = [];
      let index = 0;
      for (const el of preparedData) {
        index++;
        try {
          const generatedInviteCode = generateInviteCode();
          const studentGroup = [...groups, ...newGroups].find(
            item => item.group === el.group,
          );
          if (!studentGroup) {
            newGroups.push({ group: el.group, studentAmount: 0 });
          }
          const addInvitation = await db
            .collection('invites')
            .doc()
            .set({ ...el, inviteCode: generatedInviteCode });
          _result.push(
            `${index}.\t${el.group}\t${el.name}\t${el.lastName}\t${generatedInviteCode}\t`,
          );
        } catch (e) {
          message.error({
            content: `Не удалось зарегистрировать ${el.name} ${el.lastName} ${el.group}`,
          });
        }
      }
      try {
        for (const el of newGroups) {
          await db.collection('groups').doc().set(el);
        }
      } catch (e) {}
      setResult(_result.join('\n'));
      writeResultsToClipboard(_result.join('\n'));
      message.success({ content: 'Успешно', key: 'add-student' });
    } catch (e) {
      message.error({
        content: 'Кажется, что-то пошло не так',
        key: 'add-student',
      });
    }
    setLoading(false);
  };

  const writeResultsToClipboard = async (data = result) => {
    try {
      await navigator.clipboard.writeText(data);
      message.success({
        content: 'Инвайт коды были скопированы в буффер обмена',
      });
    } catch (e) {
      message.error({
        content:
          'При копировании инвайт кодов произошла ошибка, инвайт коды выведены в консоль',
      });
    }
  };

  const generateInviteCode = () => {
    let code = '';
    let chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    while (code.length < 10) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  };

  const parseData = data => {
    const formattedData = data
      .filter(el => el)
      .map(el => {
        return {
          name: el.name,
          lastName: el.lastName || '',
          group: el.group,
          inviteCode: generateInviteCode(),
        };
      });
    return formattedData;
  };

  const validate = data => {
    for (const el of data) {
      if (Object.keys(el).length !== 3 && !isNaN(el.group)) {
        return false;
      }
    }
    return true;
  };

  return (
    <AddStudents
      result={result}
      getWholeInviteCodes={getWholeInviteCodes}
      copyToClipboard={writeResultsToClipboard}
      loadingActiveInvites={loadingActiveInvites}
      loading={loading}
      preparedData={preparedData}
      parse={parse}
      upload={upload}
      {...props}
    />
  );
};

export default AddStudentsContainer;
