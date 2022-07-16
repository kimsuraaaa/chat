import React, { useEffect } from 'react';
import styled from 'styled-components';

import Message from './Message';

// import './Messages.css';

const Messages = ({ messages, name }) => (
  <MessagesBox>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </MessagesBox>
);

export default Messages;

const MessagesBox = styled.div`
  flex: 5;
  padding: 4rem 3rem 0;
  overflow: auto;
`;
