

var express = require("express");
var app = express();

var bodyParser= require("body-parser");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
app.use(express.static('public'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

require('./routes/index.js')(app);


