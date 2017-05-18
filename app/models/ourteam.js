var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var Ourteam = new Schema({
    Name: { type: String, required: 'Please Enter Your Name'},
    url: { type: String, required: 'Please Enter Your url' },
    Desc: {  type: String, required: 'Please Enter Your decs' }
});

module.exports = mongoose.model('Ourteam', Ourteam);