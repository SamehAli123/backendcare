
var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var Booking = new Schema({
    name:{type: String, requied: 'please  enter name '},
    date: { type:String, requied: 'please  enter date ' },
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    mobileNo:{  type: String, requied: 'please  enter mobile number ' },
    note:{ type: String, requied: 'please  enter note '},
    doc: { type: Schema.Types.ObjectId, ref: 'Doc', required: 'Please enter doctor' },
    period: {  type: String, requied: 'please  enter  the period ' }


});
module.exports = mongoose.model('Booking', Booking);