import React from 'react';
import Tests from './Tests';

const TestsContainer = props => {
  return (
    <Tests data={testData} {...props} />
  );
};
const testData=[
  {
    title:'Тест по ПОМИ',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
  {
    title:'Тест по ПОМИ2',
    questionsAmount: '6',
    timeLimit: '3min',
    accesibleTill: '15 mar 13:30',
    tryAmount: '3',
  },
  {
    title:'Тест по CТК',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
  {
    title:'Тест по ПОМИ',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
  {
    title:'Тест по ПОМИ2',
    questionsAmount: '6',
    timeLimit: '3min',
    accesibleTill: '15 mar 13:30',
    tryAmount: '3',
  },
  {
    title:'Тест по CТК',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
  {
    title:'Тест по ПОМИ',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
  {
    title:'Тест по ПОМИ2',
    questionsAmount: '6',
    timeLimit: '3min',
    accesibleTill: '15 mar 13:30',
    tryAmount: '3',
  },
  {
    title:'Тест по CТК',
    questionsAmount: '36',
    timeLimit: '30min',
    accesibleTill: '12 mar 13:30',
    tryAmount: '1',
  },
]

export default TestsContainer;