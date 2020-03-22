const ErrorWithObject = require('error-with-object');
const callarest = require('./');

function callarestJson (options, callback) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  let body;
  if (options.body != null) {
    body = JSON.stringify(options.body);
  }

  callarest({
    ...options,
    headers,
    body
  }, function (error, rest) {
    if (error) {
      return callback(error);
    }

    try {
      rest.body = rest.body !== '' ? JSON.parse(rest.body) : undefined;
    } catch (error) {
      return callback(new ErrorWithObject({
        code: 'RESPONSE_NOT_VALID_JSON',
        message: 'The response body could not be JSON.parsed',
        ...rest
      }));
    }

    callback(null, rest);
  });
}

module.exports = callarestJson;
