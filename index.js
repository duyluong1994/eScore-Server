const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var score_api = require('./routes/score_api');

var http = require("http");
setInterval(function() {
    http.get("https://escore-server.herokuapp.com/");
}, 50000); // every 5 minutes (300000)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
    .use('/score_api', score_api)
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
