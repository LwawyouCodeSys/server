let tablename = function (params) {
    return params.match(/^table=(.+)/)[1] || '';
}
exports.type = function (req) {
    var params = (req.params || {table: ""}).table,
        query = req.query || {},
        body = req.body || {},
        method = req.method || "GET";

    var temp = params.match(/table=(.+)/g)[0],
        paramsArray = temp.split(";"),
        table = tablename(paramsArray[0]),
        fields = "*",
        where = "";

    if(Object.keys(params).length == 0){
        res.json("This route need a parameters to perform. [ table=tablename (optional: ;fields=columnname, ...) ]");
    }
    if(Object.keys(query).length > 0){
        where = "WHERE ";
        for(var i in query){
            where += i + " = '" + query[i] + "'";
        }
    }
    if (paramsArray.length > 1) {
        fields = paramsArray[1].match(/^fields=(.+)/)[1];
    }

    if (paramsArray[0].indexOf('table')>=0 && method == "GET") {
        return {
            type: "table",
            query: "SELECT "+fields+" from " + table + " " + where
        }
    } else if (paramsArray[0].indexOf('table')>=0 && method == "POST") {
        var cols = [];
        var value = [];
        for(var i in body){
            cols.push(i);
            value.push(body[i]);
        }
        return {
            type: "table",
            query: "INSERT INTO "+ table + " (" + cols.join(",") + ") VALUES ('" + value.join("','") + "') "
        }
    } else if (paramsArray[0].indexOf('table')>=0 && method == "PUT") {
        var value = [];
        for(var i in body){
            value.push(i + " = '" + body[i] + "'");
        }
        return {
            type: "table",
            query: "UPDATE "+ table + " SET " + value.join(",") + " " + where
        }
    } else if (paramsArray[0].indexOf('table')>=0 && method == "DELETE") {
        return {
            type: "table",
            query: "UPDATE "+ table + " SET deleted = 1 " + where
        }
    } else if (paramsArray[0].indexOf('sp')>=0) {
        return {
            type: "sp",
            query: "CALL " + table
        }
    }
}