var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// use express for the / route response  run the /burgers route
router.get("/", (req, res) => {
  res.redirect("/burgers");
});

//use /burgers route to render all the data from mysql to index using hundlebars
router.get("/burgers", (req, res) => {
  burger.all((burgerData) => {
    res.render("index", { burger_data: burgerData });
  });
});

// use the /burgers/create route to get the data submited from inputs in the browser and post it to the mysql and also redirect to the browser too
router.post("/burgers/create", (req, res) => {
  burger.create(req.body.burger_name, (result) => {
    res.redirect("/");
  });
});

// Send back response and let page reload from .then in Ajax
router.put("/burgers/:id", (req, res) => {
  burger.update(req.params.id, (result) => {
    res.status(200).end()
  });
});

module.exports = router;
