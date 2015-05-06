/**
 * Created by pauljones on 6/05/15.
 */
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
        })

        .get(function(req,res){
            var query = {};

            if(req.query.saveDash)
            {
                query.saveDash = req.query.saveDash;
            }
            Dashboard.find(query, function(err,dashboards){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(dashboards);
            });
            //res.json(responseJSON);
        });

    dashboardRouter.route('/:dashboardId')
        .get(function(req,res){
            //console.log(req.params.dashboardId);
            Dashboard.findById(req.params.dashboardId, function(err,dashboard){
                if(err)
                    res.status(500).send(err);
                else if(dashboard)

                    res.json(dashboard);
            });
        });

    return dashboardRouter;
};

module.exports = routes;



