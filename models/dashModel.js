/**
 * Created by pauljones on 5/05/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var dashboardModel = new Schema({
    pageTitle: {type:String},
    saveDash: {type:Boolean,default:true},
    widgets: {type: Array}
});

module.exports = mongoose.model('Dashboard', dashboardModel);