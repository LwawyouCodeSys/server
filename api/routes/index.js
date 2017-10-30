'use strict';
module.exports = function(app){
    var tasks = require('../controllers/task');
    
    app.route('/tasks/:table')
        .get(tasks.read)
        .put(tasks.update)
        .post(tasks.post);

};