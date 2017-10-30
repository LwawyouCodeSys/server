'use strict';
module.exports = function(app){
    var tasks = require('../controllers/task');
    
    app.route('/tasks/:table')
        .get(tasks.read)
        .delete(tasks.delete)
        .put(tasks.update)
        .post(tasks.post);

};