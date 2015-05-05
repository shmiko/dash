/**
 * Created by pauljones on 5/05/15.
 */
var express = require('express');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/dashAPI');

var Dash = require('./models/dashModel');

var app = express();

var port = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

var myRouter = express.Router();

myRouter.route('/Dashboards')
    .post(function(req,res){
        var dashboard = new Dashboard(req.body);
        dashboard.save();
        res.status(201).send(dashboard);
        //console.log(dashboard);

        //res.send(dashboard);
    })

    .get(function(req,res){
        var query = {};

        if (req.query.widgets)
        {
            query.widgets = req.query.widgets;
        }
        //var responseJSON = {hello: "hello paul"};
        Dash.find(query, function(err, dashboards){
            if (err)
                res.status(500).send(err);
                //console.log(err);
            else
                res.json(dashboards);
        });
        //res.json(responseJSON);
    });

myRouter.route('/Dashboards/:id')
    .get(function(req,res){

        //var responseJSON = {hello: "hello paul"};
        Dash.findById(req.params.id, function(err, dashboard){
            if (err)
                res.status(500).send(err);
            //console.log(err);
            else
                res.json(dashboard);
        });
        //res.json(responseJSON);
    });


app.use('/api', myRouter);

app.get('/', function(req,res){
    res.send('Gotcha');
});

app.listen(port, function(){
    console.log("Gulp is running the app on port: " + port);
});