/**
 * Created by pauljones on 6/05/15.
 */
/**
 * Created by pauljones on 6/05/15.
 */
var express = require('express');

var routes = function(Dashboard){
    var dashboardRouter = express.Router();

    dashboardRouter.route('/Dashboards')
        .get(function(req,res){

            var query = {};

            if(req.query.widgets)
            {
                query.widgets = req.query.widgets;
            }
            Dashboard.find(query, function(err,dashboards){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(dashboards);
            });
        });

    dashboardRouter.route('/Dashboards/:id')
        .get(function(req,res){


            Dashboard.findById(req.params.id, function(err,dashboard){
                if(err)
                    res.status(500).send(err);
                else
                    res.json(dashboard);
            });
        });

    return dashboardRouter;
};

module.exports = routes;



