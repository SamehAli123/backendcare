
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Offer = new Schema({
    Name: { type: String, requied: 'please enter your name ' },
    PriceBefore: { type: String, required: 'Please select price before offer' },
    PriceAfter: { type: String, required: 'Please select price after offer' },
    CreateDate: { type: Date, default: Date.now },
    Details:{type:String},
    url:{type:String}
});
module.exports = mongoose.model('Offer', Offer);