const express = require('express'),
      socket = require('socket.io'),
      bodyParser = require('body-parser'),
      async = require("async"),
      _ = require("lodash");

const middleware = require("./config/middleware"),
     constants = require("./config/constants"),
     models = require("./config/models"),
     veteModel = models.veteModel,
     app = express();

const router = express.Router();

let gameRoutes = require('./api/routes/veteRoutes');
veteRoutes(app);

app.use(constants.SERVER_ROUTE, router);

const server = app.listen(constants.SERVER_PORT, () => {
                  console.log('El servidor esta corriendo en el puerto ' + constants.SERVER_PORT);
});
