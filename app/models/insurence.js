
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Insurence = new Schema({
    Name: { type: String, required: 'Please Enter Your Name' },
    Desc: { type: String, required: 'Please Enter Your description' },
    url: { type: String, required: 'Please Enter Your photo' },
});
module.exports = mongoose.model('Insurence', Insurence);