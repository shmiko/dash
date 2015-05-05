/**
 * Created by pauljones on 6/05/15.
 */
var express = require('express');

var routes = function(Dashboard){
    var dashboardRouter = express.Router();

    dashboardRouter.route('/')
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
            Dashboard.find(query, function(err, dashboards){
                if (err)
                    res.status(500).send(err);
                //console.log(err);
                else
                    res.json(dashboards);
            });
            //res.json(responseJSON);
        });

    dashboardRouter.route('/:id')
        .get(function(req,res){

            //var responseJSON = {hello: "hello paul"};
            Dashboard.findById(req.params.id, function(err, dashboard){
                if (err)
                    res.status(500).send(err);
                //console.log(err);
                else
                    res.json(dashboard);
            });
            //res.json(responseJSON);
        });
    return dashboardRouter;
};

module.exports = routes;



