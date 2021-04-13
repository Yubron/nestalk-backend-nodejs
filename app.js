const { join } = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const chatRouter = require('./chatRouter');
const roomRouter = require('./roomRouter');
const bodyParser = require('body-parser');

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nestalk Backend API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      contact: {
        name: "Doong-Ji",
        url: "https://github.com/Doong-Ji/nestalk-backend-nodejs",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/room",
      },
    ],
  },
  apis: ["./roomRouter.js"],
};
const specs = swaggerJsdoc(options);


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
app.use("/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = app;
