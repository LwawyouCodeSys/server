var mysql = require('../database');
var model = require('../models');
var logs = require('../logs');

var database = function(task, res){
    mysql(task.query, function (results) {
        res.json(results);
    });
}

exports.read = function(req, res){
    var task = model.type(req);
    logs("Query=> ", task.query);
    database(task, res);
}
exports.post = function(req, res){
    var task = model.type(req);
    logs("Query=> ", task.query);
    database(task, res);
}
exports.update = function(req, res){
    var task = model.type(req);
    logs("Query=> ", task.query);
    database(task, res);
}
exports.delete = function(req, res){
    var task = model.type(req);
    logs("Query=> ", task.query);
    database(task, res);
}