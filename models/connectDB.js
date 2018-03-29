module.exports = {
    connectDB: function connectDB() {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/test');
    }
};