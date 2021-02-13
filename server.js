const express = require("express");
const PORT = process.env.PORT || 8080;

const app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

var xphbs = require("express-handlebars");


app.engine("handlebars", xphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set Handlebars.
const router = require("./controllers/burgers_controller.js");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");



// Import routes and give the server access to them.
// var require = require("./controllers/burgers_controller.js");

app.use(router);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});

