var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var social = ['facebook', 'twitter', 'google+','register'];
var User = new Schema({
    name: {type: String},
    SocialId: {type: String},
    url: {type: String},
    loginway: {type: String,enum: social},
    mobileNo:{type: String},
    password:{type: String},
    email:{type:String,require}
});
module.exports = mongoose.model('User', User);