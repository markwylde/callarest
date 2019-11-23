const http = require('http');
const https = require('https');
const ErrorWithObject = require('error-with-object');

function callarest (options, callback) {
  const uri = new URL(options.url);

  const headers = options.headers || {};
  if (options.data != null) {
    if (typeof options.data !== 'string') {
      return callback(new ErrorWithObject({
        message: 'You did not set the data property to an String. Did you mean to JSON.stringify an object it or use the callarest.json shortcut?',
        code: 'SENT_OBJECT_AS_DATA'
      }));
    }
    headers['Content-Length'] = Buffer.byteLength(options.data);
  }

  const httpOrHttps = uri.protocol === 'https:' ? https : http;
  const opts = {
    headers,
    method: 'GET',
    hostname: uri.hostname,
    port: uri.port,
    path: `${uri.pathname}${uri.search}`,
    protocol: uri.protocol,
    ...options
  };

  let chunks = Buffer.from([]);
  const request = httpOrHttps.request(opts, (response) => {
    response.on('data', (chunk) => {
      chunks = Buffer.concat([chunks, chunk]);
    });
    response.on('end', () => {
      callback(null, {
        request,
        response,
        body: chunks.toString(options.encoding || 'utf8')
      });
    });
  });

  request.on('error', (error) => {
    callback(new ErrorWithObject({
      code: 'REQUEST_ERROR',
      ...error,
      request
    }));
  });

  if (options.data) {
    request.write(options.data);
  }
  request.end();
}

module.exports = callarest;
