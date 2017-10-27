let tablename = function(params){
    return params.match(/.*\=(.+)/)[1] || '';
}
exports.type = function(params){
    switch(params.match(/(.*)\=/)[1]){
        case "table":
            return "SELECT * from "+ tablename(params);
            break;
        case "sp":
            return "CALL "+ tablename(params);
            break;
        default:
            break;
    }
}