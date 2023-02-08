import callarest from './index.js';

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
      return callback(Object.assign(
        new Error('The response body could not be JSON.parsed'),
        {
          code: 'RESPONSE_NOT_VALID_JSON',
          ...rest
        }
      ));
    }

    callback(null, rest);
  });
}

export default callarestJson;
