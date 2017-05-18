
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Service = new Schema({
    name: { type: String},
    desc: { type: String },
    url: { type: String }
});
module.exports = mongoose.model('Service', Service);