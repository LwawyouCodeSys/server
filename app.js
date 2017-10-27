var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    secureRoutes = express.Router(),

    // custom js
    routes = require('./api/routes'),
    config = require('./config'),
    logs = require('./api/logs'),
    auth = require('./api/controllers/auth'),

    // port
    port = process.env.port || "4000";

app = express();

// To get the path and time of the event
app.use(morgan("dev"));

// Extract the incoming request since the data is encode and need to decode the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Created a secure validation in order to use the api
app.use('/api', secureRoutes);

// Get token by login your username and password
app.route('/auth').post(auth.post);

// Secure Routes
secureRoutes.use(auth.verify);
// Routes
routes(secureRoutes);


// Listen port
app.listen(port);

// logs on the server to know the api is ready
console.log('\x1b[36m%s\x1b[0m', "Restful API Server started on :: ", port, "\n");