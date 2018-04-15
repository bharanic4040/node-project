
const request = require('request');
//open weather api key
const apiKey = '440b606e877c6b499f81995fadaa6dd0';


const config1= require('../middlewares/config');

module.exports = function (app) {


    app.get('/weather', function (req, res) {
        
      
        res.render('index', {weather: null, error: null});
      });
      
      app.post('/weather', function (req, res) {
        
        let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${config1.OPEN_WEATHER_API_KEY}`

  request(url, function (err, response, body) {
    if(err){
       
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
});
      });


}