// Import MySQL connection.
const connection = require('../config/connection.js');

// Helper function for SQL syntax.
const printQuestionMarks = (num) => {
    var arr = []
    for (var i = 0; i < num; i++) {
        arr.push("?")
    }
    return arr.toString();
},

// Helper function for SQL syntax.
const objToSql = (ob) => {
    var arr = [];
    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + "=" + ob[key]);
        }
    }
    return arr.toString();
},

// Object for all our SQL statement functions.
var orm = {
    selectAll: (tableInput, cb) => {
        connection.query = "SELECT * FROM" + tableInput + ";", (err, result) => {
            if (err) throw err;
            cb(result);
        };
    },

    insertOne: (table, columns, values, cb) => {
        var query = "INSERT INTO" + table + " (" + columns.toString() + ") VALUES (" + printQuestionMarks(values.length) + ")";
        connection.query(query, values, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    // updateOne
    updateOne: ((table, objColVal, condition, cb) => {
        var query = "UPDATE" + table + "SET" + objToSql(objColVal) + "WHERE" + condition;
        connection.query(query, (err, result) => {
            if (err) throw err;
            cb(result);
        });
    }),
};

// Export the orm object for the model (burger.js).
module.exports = orm;