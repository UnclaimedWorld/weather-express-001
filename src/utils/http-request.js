const http = require('http');

const request = (options, callback) => {
  const request = http.request(options.url, (response) => {
    let data = '';
  
    response.on('data', (chunk) => {
      data += chunk.toString();
    });
    response.on('end', () => {
      callback(undefined, {body: JSON.parse(data)});
    });
  });
  
  request.on('error', (e) => {
    callback(e);
  });
  
  request.end();
}

module.exports = request;