var express = require('express');
var router = express.Router();

var TodayMatches = require('../models/TodayMatches.js');


// GET index server
router.get('/',function (req, res) {


    // tạo  schemas and models ở đây.
    var match = new TodayMatches({
        title: 'String',
        href: 'String',
        team1: {
            country: 'String', flag: {src: 'String'}, name: 'String', gamedata:{round: {score: '2', class: 'String'}, game: {score: '1', class: 'String'}}},
        team2: {
            country: 'String', flag: {src: 'String'}, name: 'String', gamedata:{round: {score: '1', class: 'String'}, game: {score: '1', class: 'String'}}}
    });
    TodayMatches.dro
    match.save(function (err, match) {
        if (err) return console.error(err);
        console.dir(match);
    });

    res.send("done");
});

module.exports = router;