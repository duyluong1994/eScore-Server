var mongoose = require('mongoose');
//Modeling
  var TodayMatchesSchema = new mongoose.Schema({
      title: String,
      href: String,
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
  var TodayMatches = mongoose.model('TodayMatches', TodayMatchesSchema);
  module.exports = TodayMatches;