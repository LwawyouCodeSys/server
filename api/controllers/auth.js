var jwt = require('jsonwebtoken');
var mysql = require('../database');
var logs = require('../logs');
var secret = process.env.secret;
var token = "";

var auth = {
    token: function(req, res){
        if(token.length > 0){
            res.status(200).json({
                "success": true,
                "token": token
            });
        }else{
            res.status(404).send("No token has been created.");
        }
    },
    setToken: function(payload){
        token = jwt.sign(payload, secret);
        return token;
    },
    post: function(req, res){
        var data = req.body || {};
        if(data.email.length > 0 && data.password.length > 0){
            var task = "SELECT * FROM user where email = '"+data.email+"' AND password='"+data.password+"';";
            mysql(task, function (results) {
                if(results.length > 0){
                    res.status(200).json(auth.setToken({
                        user: data.email
                    }));
                }else{
                    res.status(401).json({success: false, message: "Invalid Email & Password"});
                }
            });
            
        }else{
            res.status(406).json({success: false, message: "Please fill in the required fields!"});
        }
    },
    verify: function(req, res, next){
        var token = req.headers["authorization"] || req.headers["proxy-authorization"] || '';
        if(token){
            var filter = token.match(/Basic (.+)/)[1];
            jwt.verify(filter, secret, function(err, decoded){
                if(err){
                    logs("Invalid Token :: "+filter);
                    return res.status(401).json({
                        success: false, message: "Invalid token."
                    });
                }
                req.decoded = decoded;
                next();
            });
        }else{
            return res.status(403).send({
                success: false,
                message: "No token provided"
            });
        }
    }
}
module.exports = auth;
