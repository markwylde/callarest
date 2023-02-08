# Callarest
A simple tool to natively make http(s) requests in node

## Example Usage
### Verbose
```javascript
import { callarest } from 'callarest';

callarest({
  method: 'post',
  body: JSON.stringify({ hello: 'world' }),
  headers: {
    'Content-Type': 'application/json'
  },
  url: 'https://www.example.com'
}, function (error, rest) {
  if (error) {
    console.log('There was an error:', error);
  }
  console.log('The request was:', rest.request);
  console.log('The response was:', rest.response);
  console.log('The body was:', rest.body);

  // body will be a string
})
```

### JSON
```javascript
import { callarestJson } from 'callarest';

callarestJson({
  method: 'post',
  body: { hello: 'world' },
  url: 'https://www.example.com'
}, function (error, rest) {
  if (error) {
    console.log('There was an error:', error);
  }
  console.log('The request was:', rest.request);
  console.log('The response was:', rest.response);
  console.log('The body was:', rest.body);

  // body will be a javascript Object
})
```

## License
This project is licensed under the terms of the MIT license.
