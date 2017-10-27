var mysql = require('../database');
var model = require('../models');
var logs = require('../logs');

exports.read = function(req, res){
    var params = (req.params || {id: ""}).id;
    if(Object.keys(params).length == 0){
        res.json("This route need a parameters to perform.");
    }
    var task = model.type(params);

    logs("Query=> ", task);
    mysql(task, function (results) {
        res.json(results);
    });
}
exports.post = function(req, res){
    var params = (req.params || {id: ""}).id;
    var data = req.body || {};
    if(Object.keys(params).length == 0){
        res.json("This route need a parameters to perform(e.g table=tablename).");
    }
    var task = model.type(params),
        where = "",
        j = 0;
        
    if(Object.keys(data).length == 0){
        res.json("This route need to be POST method. JSON only");
    }
    where += " where ";
    for(var i in data){
        where += i+"='"+data[i]+"'";
        j++;
        if(j < Object.keys(data).length){
            where += " AND ";
        }
    }
    task += where;
    logs("Query=> ", task);
    mysql(task, function (results) {
        res.json(results);
    });
}