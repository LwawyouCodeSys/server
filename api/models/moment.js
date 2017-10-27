var moment = require('moment');

exports.date = {
    getDate: function(){
        return moment().format('LLLL');
    },
    getDateBySlash: function(){
        return moment().format('l');
    },
    getTime: function(){
        return moment().format('LTS');
    },
    getDateByDash: function(){
        return moment().format("YYYY-MM-DD"); 
    }
}