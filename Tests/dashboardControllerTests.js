/**
 * Created by pauljones on 7/05/15.
 */
var should = require('should');
var sinon = require('sinon');

describe('Dashboard Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Dashboard = function(dashboard){this.save = function(){}};

            var req = {
                body: {
                    pageTitle: 'Join'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var dashboardController = require('../Controllers/dashboardController')(Dashboard);

            dashboardController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})