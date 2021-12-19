let express = require('express'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  database = require('./database'),
  bodyParser = require('body-parser')
  createError = require('http-errors');
const { auth } = require("express-oauth2-jwt-bearer");

// Connect mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(database.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected")
  },
  error => {
    console.log("Database could't be connected to: " + error)
  }
)

const modelPromise = require('../backend/routes/generic.route')
// const studentAPI = require('../backend/routes/student.route')

// set up express app
const app = express();
// use bodyparser to decode http requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
// enable cross origin resource sharing
app.use(cors());

// Define middleware that validates incoming bearer access token JWTs
const checkJwt = auth({
  issuerBaseURL: "https://eventregistration.us.auth0.com",
  audience: "express_mongodb"
});

// wait for models to be created
modelPromise.then( function(API){
  app.use(function (req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path)
    next()
  })
  app.use('/model', API.genericAPI)
  app.use('', API.modelAPI)
  // Create port
  const port = process.env.PORT || 4000;
  const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
  })

  // Find 404
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
  });
})
