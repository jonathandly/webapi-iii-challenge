const express = require('express');

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
server.use(logger);

function logger(req, res, next) {
  let now = new Date();
  console.log(`Request Type->${req.method} Request URL->${req.url} Timestamp->${now}`);
};

module.exports = server;
