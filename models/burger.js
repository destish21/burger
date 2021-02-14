//require the methods exported from orm constructor object
var orm = require("../config/orm.js");

var burger = {
  //from burgers table get a response of all the data
  all: (cb) => orm.all("burgers", (res) => cb(res)),

  // use burgers table burger_name column and add it to the not devoured list
  create: (name, cb) =>
    orm.create("burgers", ["burger_name", "devoured"], [name, false], cb),

  //to update devoured pass the id of that devoured and pass that value to devored list
  update: (id, cb) =>
    orm.update("burgers", { devoured: true }, `id= ${id}`, cb),
};

module.exports = burger;
