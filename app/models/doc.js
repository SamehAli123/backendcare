var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Doc = new Schema({
    Email: { type: String, required: 'Please Enter Your email', unique: true },
    Name: { type: String, required: 'Please Enter Your Name', unique: true },
    Password: { type: String, required: 'Please Enter Your Password' }});

module.exports = mongoose.model('Doc', Doc);