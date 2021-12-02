const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));
hbs.registerPartials(partialsPath);

app.set('view engine', 'hbs');
app.set('views', viewsPath);


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    img: '/mercy.jpg',
    title: 'About'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help page',
    title: 'help'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Pass in address'
    });
  }

  geocode(req.query.address, (error, {lat, lng} = {}) => {
    if(error) {
      return res.send({
        error
      });
    }

    forecast(lat, lng, (error, response) => {
      if(error) {
        return res.send({
          error
        });
      }
      res.send(response);
    })
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    errorMessage: 'Help article not found',
    title: 'Error'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    errorMessage: '404 not found',
    title: 'Error'
  });
});

app.listen(port, () => {
  console.log('App running on port ' + port);
})