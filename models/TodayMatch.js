var mongoose = require('mongoose');
//Modeling
  var TodayMatchSchema = new mongoose.Schema({
      title: String,
      href: String,
      time: String,
      team1: {
          country: String,
          flag: {
            src: String
          },
          name: String,
          gamedata:{
              round: {
                score: Number,
                class: String
              },
              game: {
                score: Number,
                class: String
              }
          }
      },
      team2: {
          country: String,
          flag: {
              src: String
          },
          name: String,
          gamedata:{
              round: {
                  score: Number,
                  class: String
              },
              game: {
                  score: Number,
                  class: String
              }
          }
      }
  });
  var TodayMatch = mongoose.model('TodayMatch', TodayMatchSchema);
  module.exports = TodayMatch;