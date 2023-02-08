function parseBody (request, callback) {
  let body = [];

  request
    .on('data', function (chunk) {
      body.push(chunk);
    })

    .on('end', function () {
      body = Buffer.concat(body).toString();

      if (body) {
        try {
          return callback(null, body);
        } catch (error) {
          const newError = Object.assign(
            new Error('callarest: could not parseBody'),
            {
              code: 400,
              error,
              body
            }
          );
          callback(newError);
          return;
        }
      }

      return callback(null, null);
    })
    .on('error', function (error) {
      callback(error);
    });
}

export default parseBody;
