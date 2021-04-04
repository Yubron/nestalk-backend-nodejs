const { join } = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const chatRouter = require('./chatRouter');


app.use(morgan('dev'));

// VIEW ENGINE HTML SET-UP
app.set('views', __dirname + '/tempClient');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/tempClient'));

app.use('/', chatRouter);

module.exports = app;
