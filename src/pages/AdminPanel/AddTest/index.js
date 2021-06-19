import React, { useState } from 'react';
import AddTest from './AddTest';
import * as csv from 'csvtojson';
import firebase from 'firebase/app';
import { message } from 'antd';
import 'firebase/auth';
import 'firebase/firestore';

const AddTestContainer = props => {
  const [preparedData, setPreparedData] = useState();
  const [name, setName] = useState('');

  const db = firebase.firestore();

  const parse = async file => {
    const data = await csv({
      noheader: true,
      trim: true,
      headers: ['question', 'multiselection'],
    }).fromString(await file.text());
    setPreparedData(parseData(data));
    return false;
  };

  const upload = async () => {
    try {
      message.loading({ content: 'Loading...', key: 'add-test' });
      const data = {
        questions: [...preparedData],
        name: name,
      };
      const addTest = await db.collection('tests').doc().set(data);
      db.collection('tests')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.data());
          });
        });
      message.success({ content: 'Успешно', key: 'add-test' });
    } catch (e) {
      message.error({
        content: 'Кажется, что-то пошло не так',
        key: 'add-test',
      });
      console.log(e);
    }
  };

  const parseData = data => {
    const modifyAnswer = value => {
      if (value.startsWith('+') || value.startsWith('-')) {
        return value.substring(1);
      }
    };
    const formattedData = data
      .map(el => {
        if (el.question) {
          const formatedData = {
            question: el.question,
            multiselection: !!el.multiselection,
            answers: [],
          };

          delete el.question;
          delete el.multiselection;

          for (const [, value] of Object.entries(el)) {
            if (value) {
              formatedData.answers.push({
                answer: modifyAnswer(value),
                isRight: value.startsWith('+'),
              });
            }
          }

          if (formatedData.answers.filter(el => el.isRight).length > 1) {
            formatedData.multiselection = true;
          }

          return formatedData;
        }
      })
      .filter(el => el);
    return formattedData;
  };

  return (
    <AddTest
      upload={upload}
      preparedData={preparedData}
      parse={parse}
      name={name}
      setName={setName}
      {...props}
    />
  );
};

export default AddTestContainer;
