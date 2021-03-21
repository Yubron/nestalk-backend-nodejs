const socket = io('http://localhost:3000');

<<<<<<< HEAD
const messagesBox = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const roomName = document.getElementById('roomName').innerText;

// 본인 메시지
form.addEventListener('submit', function(e) {
  e.preventDefault();
  const message = input.value;
  if (input.value) {
    var item = document.createElement('li');
    item.textContent = message;
    messagesBox.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
    
    socket.emit('newMessage', {message, roomName});
    input.value = '';
  }
});

//   // 타인 메시지
// socket.on('newMessage', function(msg) {
//   var item = document.createElement('li');
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });

/* 프론트단에서 소켓에 직접 전송할 것으로 생각됨
function sendMessage(message) {
  socket.emit('newMessage', { message });
  console.log(`You: ${message}`);
}
*/

function handleMessageNotification(data) {
  const { message } = data;
  console.log(`${message}`);
  
  var item = document.createElement('li');
  item.style.cssText = 'text-align:right';
  item.textContent = `${message}`;
  messagesBox.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

socket.on('messageNotification', handleMessageNotification);
=======
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
    socket.emit('userJoin', {userId, roomId});
});

// 채팅방 정보를 받아옴.
socket.on('roomInfo', ({roomUsers, roomChats}) => {
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
    userId = document.getElementById('userId').value;
    roomId = document.getElementById('roomId').value;
    const message = document.getElementById('chatInput').value;

    socket.emit('sendMessageToServer', {userId, roomId, message});
});

// 서버로부터 메시지를 받음
socket.on('getMessageFromServer', ({userId, roomId, message}) => {
    console.log({userId, roomId, message});
});
>>>>>>> 6afaefef58f242eeabb2fd945bad45ef6dc9241e
