
//https://github.com/bharanic4040/node-project

//start nginx - sudo nginx
//stop nginx - sudo nginx -s stop
//nginx on port 9080 for reverse proxy
//pm2 start index.js to start app


var express = require("express");
var compression = require("compression");
var app = express();

app.use(compression());
var bodyParser= require("body-parser");
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));
app.use(express.static('public'));
//app.set('view engine', 'html');
app.set('view engine', 'ejs');

require('./controllers/users')(app);
require('./controllers/weather')(app);

const PORT = 3000;
    app.listen(process.env.PORT || PORT);
    console.log("Listening on port ", PORT);


