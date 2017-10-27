'use strict';
module.exports = function(app){
    var tasks = require('../controllers/task');
    
    app.route('/tasks/:id')
        .get(tasks.read)
        .post(tasks.post);

};