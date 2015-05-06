/**
 * Created by pauljones on 5/05/15.
 */
var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/dashAPI_test');
else {
    db = mongoose.connect('mongodb://localhost/dashAPI');
}

var Dashboard = require('./models/dashModel');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

dashboardRouter = require('./routes/dashboardRoutes')(Dashboard);

app.use('/api', dashboardRouter);

app.get('/', function(req,res){
    res.send('Gotcha');
});

app.listen(port, function(){
    console.log("Gulp is running the app on port: " + port);
});

module.exports = app;