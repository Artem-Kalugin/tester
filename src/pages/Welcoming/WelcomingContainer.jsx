import React, { useState } from 'react';
import Welcoming from './Welcoming';

const WelcomingContainer = props => {
  const [ inputFocused, setInputFocused] = useState(false);
  return (
    <Welcoming inputFocused={inputFocused} setInputFocused={setInputFocused} {...props} />
  );
};

export default WelcomingContainer;