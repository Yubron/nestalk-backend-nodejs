const { join } = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const chatRouter = require('./chatRouter');
const roomRouter = require('./roomRouter');
const bodyParser = require('body-parser');
app.use(morgan('dev'));

// VIEW ENGINE HTML SET-UP
app.set('views', __dirname + '/tempClient');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/tempClient'));

app.use(bodyParser.urlencoded({ extended: false })); // urlencoded parse
app.use(bodyParser.json()); // json을 parse하도록 함

app.use('/', chatRouter);
app.use('/room/', roomRouter);

module.exports = app;
