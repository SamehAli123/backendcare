
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Day = new Schema({
    day: { type: String, requied: 'please  enter day ' },
    Time: [{
        from: { type: String },
        to: { type: String },
    }],
});
module.exports = mongoose.model('Day', Day);