import React from 'react';
import { useLocation } from 'react-router';
import TestResults from './TestResults';


const TestResultsContainer = props => {
  const location = useLocation();

  return (
    <TestResults obj={location?.state?.obj} {...props} />
  );
};

export default TestResultsContainer;