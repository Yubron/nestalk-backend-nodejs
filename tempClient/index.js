const socket = io('http://localhost:3000');

const joinForm = document.getElementById('joinForm');
const chatForm = document.getElementById('chatForm');

let userId;
let roomId;

// 채팅방 입장 버튼을 누르면
joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userId = document.getElementById('userId').value;
  roomId = document.getElementById('roomId').value;

  // 유저가 채팅방에 입장.
  socket.emit('userJoin', { userId, roomId });
});

// 채팅방 정보를 받아옴.
socket.on('roomInfo', ({ roomUsers, roomChats }) => {
  console.log('채팅에 참여중인 인원 (가짜 데이터)');
  roomUsers.forEach((user) => {
    console.log(user);
  });

  console.log('---');
  console.log('이전 채팅 내역 (가짜 데이터)');
  roomChats.forEach((chat) => {
    console.log(chat);
  });
});

// 메시지 전송버튼을 누르면
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const file = document.getElementById('chatFile').files[0];
  const message = document.getElementById('chatInput').value;
  userId = document.getElementById('userId').value;
  roomId = document.getElementById('roomId').value;


  const xhr = new XMLHttpRequest();   // API 호출하기 위해 XHR
  const formData = new FormData();    // Img전송을 하기 위해 formData 형식 사용

  formData.append('message', message);
  formData.append('file', file);
  formData.append('userId', userId);
  formData.append('roomId', roomId);


  xhr.onload = function () {
    if (xhr.status === 200) {
      const chat = xhr.response;
      socket.emit('sendMessageToServer', JSON.parse(chat));
    } else {
      console.log(xhr.responseText);
    }
  };
  xhr.open('POST', '/upload');
  xhr.send(formData);

});

// 서버로부터 메시지를 받음
socket.on('getMessageFromServer', (chat) => {
  console.log(chat);
});
