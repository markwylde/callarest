import http from 'http';
import https from 'https';

export * as callarestJson from './json.js';

export function callarest (options, callback) {
  const uri = new URL(options.url);

  const headers = options.headers || {};
  if (options.body != null) {
    if (typeof options.body !== 'string') {
      return callback(Object.assign(
        new Error('callarest: You did not set the body property to an String. Did you mean to JSON.stringify an object it or use the callarest.json shortcut?'),
        {
          code: 'SENT_OBJECT_AS_BODY'
        }));
    }
    headers['Content-Length'] = Buffer.byteLength(options.body);
  }

  const httpOrHttps = uri.protocol === 'https:' ? options.httpsAgent || https : options.httpAgent || http;
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
    callback(Object.assign(
      new Error('callarest: request error'), {
        code: 'REQUEST_ERROR',
        ...error,
        request
      }));
  });

  if (options.body) {
    request.write(options.body);
  }
  request.end();
}

export default callarest;
