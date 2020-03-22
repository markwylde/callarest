const test = require('tape');
const righto = require('righto');

const { createJsonServer, destroyServer } = require('./helpers/server');
const callarestJson = require('../json');

test('get -> success', t => {
  t.plan(3);

  const server = righto(createJsonServer);
  const request = righto(callarestJson, {
    url: 'http://localhost:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.deepEqual(result.body, { success: true });

    destroyServer();
  });
});

test('get -> success if undefined body returned', t => {
  t.plan(3);

  const server = righto(createJsonServer, '');
  const request = righto(callarestJson, {
    url: 'http://localhost:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.deepEqual(result.body, undefined);

    destroyServer();
  });
});

test('get -> net failure', t => {
  t.plan(3);

  const server = righto(createJsonServer);
  const request = righto(callarestJson, {
    url: 'http://localhostnope:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.equal(error.code, 'ENOTFOUND');
    t.ok(error.request);
    t.notOk(result);

    destroyServer();
  });
});

test('get -> json parsing failure', t => {
  t.plan(2);

  const server = righto(createJsonServer, '{a:1, b');
  const request = righto(callarestJson, {
    url: 'http://localhost:8000'
  }, righto.after(server));

  request(function (error, result) {
    t.equal(error.code, 'RESPONSE_NOT_VALID_JSON');
    t.notOk(result);

    destroyServer();
  });
});

test('post -> success', t => {
  t.plan(3);

  const server = righto(createJsonServer);
  const request = righto(callarestJson, {
    method: 'post',
    url: 'http://localhost:8000/echo',
    body: { b: 1 }
  }, righto.after(server));

  request(function (error, result) {
    t.notOk(error);
    t.ok(result);
    t.deepEqual(result.body, { a: 'you said', b: '{"b":1}' });

    destroyServer();
  });
});

test('post -> send object as body', t => {
  t.plan(1);

  const server = righto(createJsonServer);
  const request = righto(callarestJson, {
    method: 'post',
    url: 'http://localhost:8000/echo',
    body: 'something'
  }, righto.after(server));

  request(function (error, result) {
    if (error) { console.log(error); }
    t.deepEqual(result.body, { a: 'you said', b: '"something"' });

    destroyServer();
  });
});
