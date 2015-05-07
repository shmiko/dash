/**
 * Created by pauljones on 6/05/15.
 */
/**
 * Created by pauljones on 6/05/15.
 */
var express = require('express');

var routes = function(Dashboard){
    var dashboardRouter = express.Router();
    var dashboardController = require('../Controllers/dashboardController')(Dashboard)
    dashboardRouter.route('/Dashboards')
        //.post(function(req,res){
        //    var dashboard = new Dashboard(req.body);
        //    dashboard.save();
        //    res.status(201).send(dashboard);
        //    //console.log(dashboard);
        //})
        .post(dashboardController.post)
        .get(dashboardController.get);
        //.get(function(req,res){
        //
        //    var query = {};
        //
        //    if(req.query.widgets)
        //    {
        //        query.widgets = req.query.widgets;
        //    }
        //    Dashboard.find(query, function(err,dashboards){
        //        if(err)
        //            res.status(500).send(err);
        //        else
        //            res.json(dashboards);
        //    });
        //});

    dashboardRouter.use('/Dashboards/:id', function(req,res,next){
        Dashboard.findById(req.params.id, function(err,dashboard){
            console.log(req.params.id);
            if(err)
                res.status(500).send(err);
            else if(dashboard)
            {
                req.dashboard = dashboard;
                next();
            }
            else
            {
                res.status(404).send('no dashboard found');
            }
        });
    });

    dashboardRouter.route('/Dashboards/:id')
        .get(function(req,res){
            var returnDashboard = req.dashboard.toJSON();
            returnDashboard.links = {};
            var newLink = 'http://' + req.headers.host + '/api/dashboards/?widgets=' + returnDashboard.widgets;
            returnDashboard.links.FilterByThisWidget = newLink.replace(' ', '%20');
            res.json(returnDashboard);

        })
        .put(function(req,res){
            req.dashboard.pageTitle = req.body.pageTitle;
            req.dashboard.widgets = req.body.widgets;
            req.dashboard.saveDash = req.body.saveDash;
            req.dashboard.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.dashboard);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.dashboard[p] = req.body[p];
            }

            req.dashboard.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.dashboard);
                }
            });
        })
        .delete(function(req,res){
            req.dashboard.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    //dashboardRouter.route('/Dashboards/:id')
    //    .get(function(req,res){
    //
    //
    //        Dashboard.findById(req.params.id, function(err,dashboard){
    //            if(err)
    //                res.status(500).send(err);
    //            else if(dashboard)
    //            {
    //                req.dashboard = dashboard;
    //                next();
    //            }
    //            else
    //            {
    //                res.status(404).send('no dashboard found');
    //            }
    //        });
    //    });

    return dashboardRouter;
};

module.exports = routes;



