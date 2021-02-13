const express = require("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burgerModel = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", (req, res) => {
    // console.log('startrouter.get')
    burgerModel.all((burgerData) => {
        /* var hbsObject = {
             burger: data
         };*/
        // console.log(burgerData);
        res.render("index", { burgers: burgerData });
    });
});

router.post("/api/burgers", (req, res) => {
    const burger = req.body
    console.log(burger)
    burgerModel.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], result => {
        // Send back the ID of the new burgers
        res.redirect("/");
        // res.status(200).send();

    });
});


// router.post("/", function (req, res) {
//     const burger = req.body
//     console.log(burger)
//     burger.insertOne("burger_name", burger, function(data){
//         // Send back the ID of the new burgers
//         res.status(200).send();
//     });
// });

router.put("/api/burgers/:id", (req, res) => {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burgerModel.updateOne({
        burger: req.body.devoured
    }, condition, result => {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.redirect("/");
            // res.status(200).end();
        }
    });
});

router.delete("api/burgers/:id", (req, res) => {
    const id = req.params.id
    burgerModel.delete({ id }, result => {
        res.status(200).end();
        // res.redirect("/");

    })
})

// Export routes for server.js to use.
module.exports = router;
