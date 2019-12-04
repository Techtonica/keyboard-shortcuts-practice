const path = require('path');
const morgan = require('morgan');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(morgan('dev')); //morgan gives us useful logging

require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require("./routes/routes.js");
app.use('/', routes);

app.use((req, res) => {
    res.status(404).render('not_found');
  });

const server = app.listen(3000, function () {
    console.log("Listening on http://localhost:" + server.address().port, ":-D");
});