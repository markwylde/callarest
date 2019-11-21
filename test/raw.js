const test = require('tape');
const righto = require('righto');

const { createServer, destroyServer } = require('./helpers/server');
const callarest = require('../');

test('get [https] -> success', t => {
  t.plan(1);

  const request = righto(callarest, {
    url: 'https://localhost:8000'
  });

  request(function (error, result) {
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
    t.equal(error.code, 'ENOTFOUND');
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
    data: 'hello'
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.equal(result.body, 'You said: hello');

    destroyServer();
  });
});

test('post -> send object as data', t => {
  t.plan(1);

  const server = righto(createServer);
  const request = righto(callarest, {
    method: 'post',
    url: 'http://localhost:8000/echo',
    data: {
      a: 1
    }
  }, righto.after(server));

  request(function (error, result) {
    t.equal(error.code, 'SENT_OBJECT_AS_DATA');

    destroyServer();
  });
});
