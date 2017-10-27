var mysql = require('mysql'),
    config = require('../../config');
// create connection to mysql
var connection = mysql.createConnection(config.db);
// establish connection
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as Id <<<>>>> ' + connection.threadId,"\n\n");
});
module.exports = function(statement, callback){
    connection.query(statement, function(error, results, fields){
        if (error) throw error;
        callback(results);
    });
};

