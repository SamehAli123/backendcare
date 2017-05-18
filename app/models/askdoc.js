
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var askDoc = new Schema({
    question: { type: String, requied: 'please  enter question ' },
    answer: { type: String },
    question_creator: { type: Schema.Types.ObjectId, ref: 'User' },
    answer_creator: { type: Schema.Types.ObjectId, ref: 'Doc' },
    status: { type: Boolean, default: true },
    answered:{type:Boolean,default:false}
});
module.exports = mongoose.model('askDoc', askDoc);