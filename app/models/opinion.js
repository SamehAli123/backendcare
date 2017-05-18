
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Opinion = new Schema({
    Creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    text: { type: String, required: 'Please opinion' },
    status: { type: Boolean, default: true }

});
module.exports = mongoose.model('Opinion', Opinion);