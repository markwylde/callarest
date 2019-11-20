const http = require('http');
const parseBody = require('./parseBody');
let server;

function createServer (callback) {
  server = http.createServer((request, response) => {
    if (request.url === '/echo' && request.method === 'POST') {
      parseBody(request, (error, body) => {
        if (error) {
          throw error;
        }
        response.writeHead(200, {
          'Content-Type': 'text/html'
        });
        response.end('You said: ' + body);
      });
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end('Success');
    }
  }).listen(8000);
  callback(null, server);
}

function createJsonServer (callback) {
  server = http.createServer((request, response) => {
    if (request.url === '/echo' && request.method === 'POST') {
      parseBody(request, (error, body) => {
        if (error) {
          throw error;
        }
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({
          a: 'you said',
          b: body
        }));
      });
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify({success: true}));
    }
  }).listen(8000);
  callback(null, server);
}

function destroyServer () {
  server.close();
}

module.exports = {
  createServer,
  createJsonServer,
  destroyServer
};
