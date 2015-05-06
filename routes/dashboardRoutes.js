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

            if (req.query.pageTitle)
            {
                query.pageTitle = req.query.pageTitle;
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
    dashboardRouter.use('/:dashboardId', function(req,res,next){
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

    dashboardRouter.route('/:dashboardId')
        .get(function(req,res){

            res.json(req.dashboard);

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
    return dashboardRouter;
};

module.exports = routes;



