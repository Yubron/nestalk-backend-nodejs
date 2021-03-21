const app = require('./app');
const db = require('./db');
const dotenv = require('dotenv');
const socketIO = require('socket.io');
dotenv.config();

const PORT = process.env.PORT || 3000;

// Listen Port
function handleListening() {
    console.log(`✅ Listening at: http://localhost:${PORT}`);
}
const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on('connection', (socket) => {
<<<<<<< HEAD
  // IP 정보
  const req = socket.request;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`✅ Server connected successfully`, ip, socket.id, socket.room);
  // 클라이언트로부터 메시지 수신
  socket.on('newMessage', ({message, roomName}) => {
    // 채팅방에 입장한 후 JOIN 행위가 이루어지고, 그 값을 가지고 있어야 한다,,
    socket.join(roomName);
    console.log(message + '<<< >>>' + roomName)
    socket.broadcast.to(roomName).emit('messageNotification', { message });
  });
  // 에러
  socket.on('error', (error) => {
    console.log(error);
  });
  // 연결 종료
  socket.on('disconnect', () => {
    console.log('❌ 클라이언트 접속 해제', ip, socket.id);
  });
  // 닉네임 설정
  socket.on('setNickname', ({ nickname }) => {
    socket.nickname = nickname;
  });
=======
    // 유저가 채팅방에 입장한 경우
    socket.on('userJoin', ({userId, roomId}) => {
        // 채팅방에 참여중인 인원 정보 + 이전 채팅 내역 전달.
        const roomUsers = [
            {id: 2, roomId, name: 'kim'},
            {id: 3, roomId, name: 'lee'},
            {id: 4, roomId, name: 'park'},
        ];

        const roomChats = [
            {id: 1, roomId, userId: 1, message: 'Hello! - 1'},
            {id: 1, roomId, userId: 2, message: 'Hello! - 2'},
            {id: 1, roomId, userId: 3, message: 'Hello! - 3'},
            {id: 1, roomId, userId: 4, message: 'Hello! - 4'},
        ];

        socket.leaveAll();
        socket.join(roomId);

        socket.emit('roomInfo', {roomUsers, roomChats});
    });

    // 유저가 메시지를 전송한 경우
    socket.on('sendMessageToServer', ({userId, roomId, message}) => {
        // DB에 채팅내용 저장하고 채팅방에 전달
        io.to(roomId).emit('getMessageFromServer', {userId, roomId, message});
    });
>>>>>>> 6afaefef58f242eeabb2fd945bad45ef6dc9241e
});
