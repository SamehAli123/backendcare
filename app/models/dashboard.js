
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Dashboard = new Schema({
    url: { type: String, requied: 'please  enter url photo ' }

});
module.exports = mongoose.model('Dashboard', Dashboard);