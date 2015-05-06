/**
 * Created by pauljones on 7/05/15.
 */
var dsahboardController = function(dashboard){
    var dashboard = function(req,res){
        var dash = new Dashboard(req,res);
            dash.save();
            res.status(201).send(dash);

    }

    var get = function(req,res){
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
    }
};

module.exports = dashboardController;