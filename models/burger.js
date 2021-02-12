// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    // insertOne{}
    // The variables cols and vals are arrays.
    insertOne: function (cols, colVals, cb) {
        orm.insertOne("burgers", cols, colVals, function (res) {
            cb(res)
        });
    },
    updateOne: function(col, colVal, condition, cb){
        orm.updateOne(col, colVal, condition,function(res){
            cb(res)
        })
    },
    // update: function (objColVals, condition, cb) {
    //     orm.update("burgers", objColVals, condition, function (res) {
    //         cb(res);
    //     });
    // },
    delete: function (table, condition, cb) {
        console.log(condition)
        orm.delete("burgers", condition, function (data) {
            cb(data)
        })
    }
};


// Export the database functions for the controller (catsController.js).
module.exports = burger;


// *`selectAll()`
// * `insertOne()`
// * `updateOne()`