
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/db'); // get our config file
var User = require('./app/models/user'); // get our mongoose model

var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.url, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log({ type: 'success' });
    }
}); // connect to database




app.set('superSecret', config.secret); // secret variable




// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'POST, GET, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin,Authorization ,X-Requested-With, Content-Type, Accept,authentication");
    next();
});


require('./app/routes.js')(app);



app.listen(port);
console.log('Magic happens at http://localhost:' + port);
