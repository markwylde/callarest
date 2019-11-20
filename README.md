# Callarest
[![Build Status](https://travis-ci.org/markwylde/callarest.svg?branch=master)](https://travis-ci.org/markwylde/callarest)
[![David DM](https://david-dm.org/markwylde/callarest.svg)](https://david-dm.org/markwylde/callarest)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/callarest)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/callarest)](https://github.com/markwylde/callarest/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/callarest)](https://github.com/markwylde/callarest/blob/master/LICENSE)

A simple tool to natively make http(s) requests in node

## Example Usage
### Verbose
```javascript
const callarestJson = require('callarest/json')
callarestJson({
  method: 'post',
  data: JSON.stringify({ hello: 'world' }),
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
const callarest = require('callarest')
callarest.json({
  method: 'post',
  data: { hello: 'world' },
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
