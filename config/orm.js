//require the connection
var connection = require("./connection.js");

//in a query make a question mark for every input value place holder
const printQuestionMarks = (num) => {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
};

//for every value arr(i.e. column) passed make a key to  object of that key eqality
const objToSql = (ob) => {
  var arr = [];
  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }
  return arr.toString();
};

var orm = {
  //construct query for all contents of the table input as a callback for a function
  all: (tableInput, cb) => {
    connection.query("SELECT * FROM " + tableInput + ";", (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },

  // a method to creat a column for the value inputs in the table in the mysql database
  create: (table, columns, values, cb) => {
    var query =
      "INSERT INTO " +
      table +
      " (" +
      columns.toString() +
      ") VALUES (" +
      printQuestionMarks(values.length) +
      ")";
    connection.query(query, values, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },

  // a method that creat a connection for the query to apdate the column values
  update: (table, objColVal, condition, cb) => {
    var query =
      "UPDATE " + table + " SET " + objToSql(objColVal) + " WHERE " + condition;

    connection.query(query, (err, result) => {
      if (err) throw err;

      cb(result);
    });
  },
};

// export  all, create and create methods
module.exports = orm;
