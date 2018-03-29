var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db = require('../models/connectDB');
    db.connectDB();
var database = mongoose.connection;
var TodayMatches = require('../models/TodayMatches.js');


// GET index server
router.get('/',function (req, res) {
    database.on('error', console.error);
    database.once('open',function () {
        // tạo  schemas and models ở đây.
        var match = new TodayMatches({
            title: 'String',
            href: 'String',
            team1: {
                country: 'String',
                flag: {
                    src: 'String'
                },
                name: 'String',
                gamedata:{
                    round: {
                        score: '2',
                        class: 'String'
                    },
                    game: {
                        score: '1',
                        class: 'String'
                    }
                }
            },
            team2: {
                country: 'String',
                flag: {
                    src: 'String'
                },
                name: 'String',
                gamedata:{
                    round: {
                        score: '1',
                        class: 'String'
                    },
                    game: {
                        score: '1',
                        class: 'String'
                    }
                }
            }
        });
        match.save(function (err, match) {
            if (err) return console.error(err);
            console.dir(match);
        });
    });
    res.send();
});
module.exports = router;