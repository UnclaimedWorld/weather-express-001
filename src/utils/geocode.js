const request = require('request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFtaXJraGFsaW1vdiIsImEiOiJja3Z1aHppdXIwbnF2MndqdDc1N3BrdmJmIn0.T6v_tnCRZ6Ux9w3cKUVHpg&limit=1';
  request({ url, json: true }, (error, { body: { features } }) => {
    if(error) {
      callback('unable to connect to service');
    } else if(!features.length) {
      callback('cant find location')
    } else {
      const center = features[0].center;
      const label = features[0].place_name;
      callback(undefined, {
        lat: center[1],
        lng: center[0],
        label
      });
    }
  });
}

module.exports = geocode;