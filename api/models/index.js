let tablename = function (params) {
    return params.match(/^table=(.+)/)[1] || '';
}
exports.type = function (params) {
    var temp = params.match(/table=(.+)/g)[0],
        value = temp.split(";"),
        table = tablename(value[0]),
        fields = "*";

    if (value.length > 1) {
        fields = value[1].match(/^fields=(.+)/)[1];
    }
    if (value[0].indexOf('table')>=0) {
        return {
            type: "table",
            query: "SELECT "+fields+" from " + table
        }
    } else if (value[0].indexOf('sp')>=0) {
        return {
            type: "sp",
            query: "CALL " + table
        }
    }
}