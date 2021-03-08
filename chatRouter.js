const express = require('express');
const chatRouter = express.Router();

const { home, home2 } = require('./chatController');

chatRouter.get('/', home);

chatRouter.get('/test', home2);

module.exports = chatRouter;
