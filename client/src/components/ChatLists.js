import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Header from './Header';
import ChatData from '../data/ChatList.json';

const ChatLists = () => {
  const [nowTime, setNowTime] = useState(null);

  function timeCheck(nowTime, targetTime) {
    let gapSec = (new Date(nowTime) - new Date(targetTime)) / 1000;
    if (gapSec > 86400) {
      return (
        targetTime.split(' ')[0].replace('-', '.').replace('-', '.') +
        ' ' +
        (Number(targetTime.split(' ')[1].split(':')[0]) >= 12 ? '오후 ' : '오전') +
        (Number(targetTime.split(' ')[1].split(':')[0]) > 12
          ? Number(targetTime.split(' ')[1].split(':')[0]) - 12
          : Number(targetTime.split(' ')[1].split(':')[0])) +
        ':' +
        targetTime.split(' ')[1].split(':')[1]
      );
    } else if (gapSec <= 60) {
      return '방금전';
    } else if (gapSec <= 3600) {
      return Math.floor(gapSec / 60) + '분전';
    } else if (gapSec <= 86400) {
      return Math.floor(gapSec / 3600) + '시간전';
    }
  }

  useEffect(() => {
    setNowTime(new Date());
  }, []);

  return (
    <ChatListSection>
      <Inner>
        <ChatListBox>
          <Header title={'채팅'} type={'List'} />
          <ChatList>
            {ChatData &&
              ChatData.map((chat, idx) => {
                return (
                  <li key={idx}>
                    {/* <Link to={`/room/${chat.userId}?name=${chat.userId}&room=${chat.userId}`}> */}
                    <Link
                      to={{
                        pathname: `/room/${chat.userId}`,
                        state: {
                          name: chat.userId,
                          room: chat.userId,
                        },
                      }}
                    >
                      <ThumbItem>
                        <img src={`${process.env.PUBLIC_URL}${chat.thumbNailPath}`} />
                      </ThumbItem>
                      <ChatInfoBox>
                        <strong>{chat.userId}</strong>
                        <p>{chat.lastChat}</p>
                      </ChatInfoBox>
                      <ChatStateBox>
                        <span>
                          {timeCheck(
                            nowTime,
                            chat.lastChatDateTime.replace('-', '/').replace('-', '/')
                          )}
                        </span>
                        {chat.isRead === 'N' && <i>{chat.chatNum}</i>}
                      </ChatStateBox>
                    </Link>
                  </li>
                );
              })}
          </ChatList>
        </ChatListBox>
      </Inner>
    </ChatListSection>
  );
};

export default ChatLists;

const ChatListSection = styled.section`
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
`;

const ChatListBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  background-color: #fff;
`;

const ChatList = styled.ul`
  padding: 2rem 0;

  a {
    display: flex;
    align-items: center;
    position: relative;
    padding: 2rem 3rem;
    z-index: 10;
  }
`;

const ThumbItem = styled.span`
  width: 11.4rem;
  height: 11.4rem;
  flex: 0 0 auto;
  align-self: center;
  margin-right: 3rem;
  border-radius: 50%;
  overflow: hidden;
`;

const ChatInfoBox = styled.div`
  flex: 1 1 auto;

  strong {
    display: block;
    font-weight: 700;
    font-size: 3.5rem;
    color: #464052;
  }

  p {
    display: block;
    margin-top: 1.5rem;
    font-size: 2.5rem;
    color: #a4a6b0;
  }
`;

const ChatStateBox = styled.div`
  margin-top: 2rem;
  align-self: flex-start;
  text-align: right;

  span {
    display: block;
    font-size: 2rem;
    color: #363a42;
    opacity: 0.4;
  }

  i {
    display: inline-block;
    min-width: 3.6rem;
    height: 3.6rem;
    margin-top: 1.8rem;
    line-height: 3.6rem;
    padding: 0 1.2rem;
    font-size: 2.2rem;
    color: #fff;
    background-color: #5b36ac;
    border-radius: 2.2rem;
    text-align: center;
  }
`;
