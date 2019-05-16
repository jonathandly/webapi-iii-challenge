const express = require('express');
const USER_ROUTER = require('./users/userRouter');

const server = express();
server.use(express.json());

server.use('/api/users', USER_ROUTER);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

function logger(req, res, next) {
  let now = new Date();
  console.log(`Request Type->${req.method} Request URL->${req.url} Timestamp->${now}`);
};

//custom middleware
server.use(logger);

module.exports = server;
