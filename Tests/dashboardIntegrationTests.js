/**
 * Created by pauljones on 7/05/15.
 */
var should =  require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Dashboard = mongoose.model('Dashboard');
var agent = request.agent(app);
var expect = require('chai').expect;

describe('Dashbord Crud Test', function(){
    it('Should return a dashboard and return a read and -Id', function(done){
       var dashboardPost = {pageTitle: 'New Title', widgets: ['One','two','three'], saveDash: true};
       agent.post('/api/dashboards')
           .send(dashboardPost)
           .expect(200)
           .end(function(err, results){
               results.body.saveDash.should.not.equal(false);
               results.body.should.have.property('_id');
               done()
           });

        afterEach(function(done){
            Dashboard.remove().exec;
            done();
        });
    });
});

describe('Get Dashboards', function(){
   it('should never be empty since dashboards will be seeded', function(done){
       mongoose.connect('mongodb://localhost/dashAPI_test', function(){
          Dashboard.find({}).exec(function(error, dashboardslist){
              expect(dashboardslist.length).to.be.at.least(1);
              done();
          });
       });
   });
});

