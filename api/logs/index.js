var fs = require('fs');
var moment = require('../models/moment');

module.exports = function () {
    var string = "";
    for (var i in arguments) {
        string += arguments[i];
        if (i < arguments.length) {
            string += " ";
        }
    }
    file(string);
    console.log('\x1b[36m%s\x1b[0m', string, "\n");
}

var file = function (task) {
    fs.appendFile('logs/logs-'+moment.date.getDateByDash()+'.txt', moment.date.getDate()+" :: \t\t"+task+"\n", function (err) {
        if (err) {
            return console.error(err);
        }
    });
}