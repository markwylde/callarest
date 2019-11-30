const ErrorWithObject = require('error-with-object');
const callarest = require('./');

function callarestJson (options, callback) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  let data;
  if (options.data != null) {
    data = JSON.stringify(options.data);
  }

  callarest({
    ...options,
    headers,
    data
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
