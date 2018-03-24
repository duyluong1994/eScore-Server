const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

var score_api = require('./routes/score_api');

var https = require("https");
/*setInterval(function() {
    https.get("https://escore-server.herokuapp.com/score_api");
}, 50000); // ping server to get data every 30s*/

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
    .use('/score_api', score_api)
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));
