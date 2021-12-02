const request = require('request');

const forecast = (lat, lng, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=1edf238d15e4df91f6af3d742d96c2cb&query=' + lat + ',' + lng;
  request({ url, json: true }, (error, { body: { current, location, success } }) => {
    if(error) {
      callback('unable to connect to weather service');
    } else if(success === false) {
      callback('something went wrong');
    } else {
      callback(undefined, {
        forecast: 'It is ' + current.temperature + ' degree outside',
        location: location.name
      });
    }
  })
};

module.exports = forecast;