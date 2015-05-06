/**
 * Created by pauljones on 7/05/15.
 */
var dashboardController = function(Dashboard){
    var post = function(req,res){
        var dash = new Dashboard(req.body);

            if (!req.body.pageTitle){
                res.status(400);
                res.send('pageTitle is required');
            } else {
                dash.save();
                res.status(201);
                res.send(dash);
            }

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

    return {
        post: post,
        get: get
    }
};

module.exports = dashboardController;