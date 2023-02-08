import test from 'basictap';
import righto from 'righto';

import { createServer, destroyServer } from './helpers/server.js';
import callarest from '../index.js';

test('get [https] -> success', t => {
  t.plan(1);

  const request = righto(callarest, {
    url: 'https://localhost:8000'
  });

  request(function (error) {
    t.equal(error.code, 'ECONNREFUSED');
  });
});

test('get -> success', t => {
  t.plan(3);

  const server = righto(createServer);
  const request = righto(callarest, {
    url: 'http://localhost:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.equal(result.body, 'Success');

    destroyServer();
  });
});

test('get -> failure', t => {
  t.plan(3);

  const server = righto(createServer);
  const request = righto(callarest, {
    url: 'http://localhostnope:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.equal(error.code, 'EAI_AGAIN');
    t.ok(error.request);
    t.notOk(result);

    destroyServer();
  });
});

test('post -> success', t => {
  t.plan(3);

  const server = righto(createServer);
  const request = righto(callarest, {
    method: 'post',
    url: 'http://localhost:8000/echo',
    body: 'hello'
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.equal(result.body, 'You said: hello');

    destroyServer();
  });
});

test('post -> send object as body', t => {
  t.plan(1);

  const server = righto(createServer);
  const request = righto(callarest, {
    method: 'post',
    url: 'http://localhost:8000/echo',
    body: {
      a: 1
    }
  }, righto.after(server));

  request(function (error) {
    t.equal(error.code, 'SENT_OBJECT_AS_BODY');

    destroyServer();
  });
});
