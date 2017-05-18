
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Suggestion = new Schema({

    creator: { type: Schema.Types.ObjectId, ref: 'User', required: 'Please login' },
    note: { type: String, required: 'Please note' },
  
});
module.exports = mongoose.model('Suggestion', Suggestion);