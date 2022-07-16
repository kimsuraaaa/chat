import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';
import io from 'socket.io-client';

// 하위 컴포넌트
import Header from './Header';
import Upload from './Upload';
import Messages from './Messages';
import Input from './Input';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const { state } = useLocation();

  const [users, setUsers] = useState('');

  const [UploadOpen, setUploadOpen] = useState(false);

  const ENDPOINT = 'https://ahyoung21.herokuapp.com/';

  const handleUpoladOpen = useCallback(() => {
    setUploadOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    console.log('state', state);
    // query-string middleware의 사용
    // const data = queryString.parse(location.search);
    // console.log(location.search); // ?name=lama&room=peru
    // console.log(data); // 객체 : {name: "lama", room: "peru"}
    // 다시 정리
    // const { name, room } = queryString.parse(location.search);
    const { name, room } = state;
    // console.log(data);

    socket = io(ENDPOINT); // 소켓 연결

    setName(name);
    setRoom(room);

    // console.log(socket);
    socket.emit('join', { name, room, time }, (error) => {
      // console.log("error");
      // 에러 처리
      if (error) {
        alert(error);
      }
    });

    // return () => {
    //   socket.emit("disconnect");

    //   socket.off();
    // };
  }, [ENDPOINT, state]); // 한번만 부른다 // 불필요한 사이드 이펙트를 줄인다

  useEffect(() => {
    // 서버에서 message 이벤트가 올 경우에 대해서 `on`
    socket.on('message', (message) => {
      setTime(message.time);
      setMessages([...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      console.log(users);
      setUsers(users);
    });
  }, [messages]);

  // 메세지 보내기 함수
  const sendMessage = (e) => {
    e.preventDefault();
    console.log(e);
    if (message) {
      console.log('message', message);
      socket.emit('sendMessage', message, setMessage(''));
    }
  };

  return (
    <ChatBox>
      <Inner>
        <ChatItem>
          <Header room={room} name={name} handleUpoladOpen={handleUpoladOpen} />
          {UploadOpen && <Upload setMessage={setMessage} sendMessage={sendMessage} />}
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </ChatItem>
      </Inner>
    </ChatBox>
  );
};

export default Chat;

const ChatBox = styled.div`
  height: 100vh;
`;

const Inner = styled.div`
  display: flex;
  max-width: 750px;
  margin: 0 auto;
  height: 100%;
`;

const ChatItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #f9f9fb;
`;
