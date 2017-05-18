
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Gallary = new Schema({
    url: { type: String, requied: 'please  enter url photo ' }

});
module.exports = mongoose.model('Gallary', Gallary);