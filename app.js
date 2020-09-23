const path = require("path");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const { connectToDb } = require("./JS/orm");

const app = express();
app.use(morgan("dev")); //morgan gives us useful logging

require("ejs");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes.js");
app.use("/", routes);

app.use((req, res) => {
  res.status(404).render("not_found");
});

const startServer = async () => {
  await connectToDb();
  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log(`Listening on http://localhost:${port} :-D`);
  });
};

startServer();
