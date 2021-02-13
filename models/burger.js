// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
    all: (cb) => {
        orm.selectAll("burgers",  (res) => {
            cb(res);
        });
    },
    // insertOne{}
    // The variables cols and vals are arrays.
    insertOne: (cols, colVals, cb) => {
        orm.insertOne("burgers", cols, colVals, (res) => {
            cb(res)
        });
    },
    updateOne: (col, colVal, condition, cb) => {
        orm.updateOne("burgers", col, colVal, condition, (res) => {
            cb(res)
        })
    },
    // update: function (objColVals, condition, cb) {
    //     orm.update("burgers", objColVals, condition, function (res) {
    //         cb(res);
    //     });
    // },
    delete: (condition, cb) => {
        console.log(condition)
        orm.delete("burgers", condition, (data) => {
            cb(data)
        })
    }
};


// Export the database functions for the controller (catsController.js).
module.exports = burger;


// *`selectAll()`
// * `insertOne()`
// * `updateOne()`