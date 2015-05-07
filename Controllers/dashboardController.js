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
                var returnDashboards = [];
                dashboards.forEach(function(element, index, array){
                    var newDashboard = element.toJSON();
                    newDashboard.links = {};
                    newDashboard.links.self = 'http://' + req.headers.host + '/api/dashboards/' + newDashboard._id;
                    returnDashboards.push(newDashboard);
                });
                res.json(returnDashboards);
        });
    }

    return {
        post: post,
        get: get
    }
};

module.exports = dashboardController;