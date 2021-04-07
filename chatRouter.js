const express = require('express');
const chatRouter = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const socketIO = require('socket.io');

const { home } = require('./chatController');

chatRouter.get('/', home);

chatRouter.post('/upload', upload.any(), function (req, res) {
    // 전송 버튼 클릭 시 파일을 업로드 한 후 res객체에 전송된 내용을 담아 / index.js에서 콜백으로 emit 실행

    let filePath = null;

    if (req.files.length !== 0) {
        filePath = req.files[0].path;
    }

    const chat = {
        message: req.body.message,
        file: filePath,
        userId: req.body.userId,
        roomId: req.body.roomId,
    }

    res.json({ chat });
});

module.exports = chatRouter;
