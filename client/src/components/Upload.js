import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

import ChatData from '../data/ChatList.json';

function Upload({ setMessage, sendMessage }) {
  const addUpload = useCallback(() => {
    console.log('hi');
  }, []);

  useEffect(() => {
    // () => setMessage('test');
    console.log(setMessage);
  }, []);

  return (
    <UploadBox>
      {ChatData &&
        ChatData.map((chat, idx) => {
          return (
            <button key={idx} onClick={(e) => sendMessage(e)}>
              <img src={`${process.env.PUBLIC_URL}${chat.thumbNailPath}`} />
            </button>
          );
        })}
    </UploadBox>
  );
}

export default Upload;

const UploadBox = styled.div`
  display: flex;
  width: 100%;
  padding: 2rem 3rem;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  background: #5b36ac;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    display: inline-block;
    flex: 0 0 auto;
    width: 9rem;
    height: 9rem;
    border-radius: 0.8rem;
    cursor: pointer;
    overflow: hidden;

    & + button {
      margin-left: 2rem;
    }
  }
`;
