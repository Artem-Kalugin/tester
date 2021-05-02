import React, { useState } from 'react';
import Test from './Test';

const TestContainer = props => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <Test showDrawer={showDrawer} setShowDrawer={setShowDrawer} {...props} />
  );
};

export default TestContainer;