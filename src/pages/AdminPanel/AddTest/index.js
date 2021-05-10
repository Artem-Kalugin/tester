import React from 'react';
import AddTest from './AddTest';
import * as csv from "csvtojson";

const AddTestContainer = props => {
  const parse = async (file) => {
    const data = await csv({ 
      noheader:true,
      trim:true,
      headers: ['questionTitle','questionText','answers','rightAnswer']
    })
    .fromString(await file.text())
    return false;
  }

  return (
    <AddTest parse={parse} {...props} />
  );
};

export default AddTestContainer;