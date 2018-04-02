const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var score_api = require('./routes/score_api');
var index = require('./routes/index');
var mongoose = require('mongoose');

var https = require("https");
/*setInterval(function() {
    https.get("https://escore-server.herokuapp.com/score_api");
}, 50000); // ping server to get data every 30s*/

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
    .use('/score_api', score_api)
    //.use('/', index)
    .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
//mongoose.connect('mongodb://localhost:27017/local');
mongoose.connect('mongodb://heroku_hg2b3cm6:Delta1994@ds227119.mlab.com:27119/heroku_hg2b3cm6');
