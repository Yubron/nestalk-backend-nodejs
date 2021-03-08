const socket = io('/');

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