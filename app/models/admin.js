
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var admin = new Schema({
    email: { type: String, required: 'please  enter email ' },
    password:{type:String,required:'please enter your password'}

});
module.exports = mongoose.model('admin', admin);