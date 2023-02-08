import http from 'http';
import parseBody from './parseBody.js';
let server;

export function createServer (callback) {
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

export function createJsonServer (data, callback) {
  if (arguments.length === 1) {
    callback = data;
    data = undefined;
  }
  server = http.createServer((request, response) => {
    if (request.url === '/echo' && request.method === 'POST') {
      parseBody(request, (error, body) => {
        if (error) {
          throw error;
        }
        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        const dataToSend = data != null
          ? data
          : JSON.stringify({
            a: 'you said',
            b: body
          });
        response.end(dataToSend);
      });
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      const dataToSend = data != null ? data : JSON.stringify({ success: true });
      response.end(dataToSend);
    }
  }).listen(8000);
  callback(null, server);
}

export function destroyServer () {
  server.close();
}
