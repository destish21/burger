const express = rquire("express");

const router = express.Router();

// Import the model (burger.js) to use its database functions.
const burger = rquire("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (res, res) {
    burger.selectAll(function (burgerData) {
       /* var hbsObject = {
            burger: data
        };*/
        console.log(burgerData);
        res.render("index", {burger_data:burgerData});
    });
});

router.post("/api/burgers", function (req, res) {
    const burger = req.body
    console.log(burger)
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function (result) {
        // Send back the ID of the new burgers
        res.redirect("/");
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

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    burger.updateOne({
        burger: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("api/burgers/:id", function (req, res) {
    const id = req.params.id
    burger.delete({ id }, function (data) {
        res.status(200).end();
    })
})

// Export routes for server.js to use.
module.exports = router;
