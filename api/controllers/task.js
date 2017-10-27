var mysql = require('../database');
var model = require('../models');
var logs = require('../logs');

var database = function(task, res){
    mysql(task.query, function (results) {
        res.json(results);
    });
}

exports.read = function(req, res){
    var params = (req.params || {id: ""}).id;
    if(Object.keys(params).length == 0){
        res.json("This route need a parameters to perform.");
    }
    var task = model.type(params);
    if(task.type == "sp"){
        task.query += "()";
    }
    logs("Query=> ", task.query);
    database(task, res);
}
exports.post = function(req, res){
    var params = (req.params || {id: ""}).id;
    var data = req.body || {};
    if(Object.keys(params).length == 0){
        res.json("This route need a parameters to perform(e.g table=tablename).");
    }
    var task = model.type(params),
        value = "",
        j = 0;
        
    if(Object.keys(data).length == 0){
        res.json("This route need to be POST method. JSON only");
    }
    if(task.type == "table"){
        value += " where ";
        for(var i in data){
            value += i+"='"+data[i]+"'";
            j++;
            if(j < Object.keys(data).length){
                value += " AND ";
            }
        }
    }else{
        value += "( ";
        for(var i in data){
            value += "'"+data[i]+"'";
            j++;
            if(j < Object.keys(data).length){
                value += " , ";
            }
        }
        value += " )";
    }
    
    task.query += value;
    logs("Query=> ", task.query);
    database(task, res);
}