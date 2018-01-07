var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('coincal.db', sqlite3.OPEN_READWRITE, (err) => {
 if (err) {
   console.error(err.message);
 }
 console.log('Connected to the chinook database.');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/btc')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .get(function(req, res) {
        var arr = [];
        
        let sql = `SELECT date,desc,votes FROM coincal`;

            db.all(sql, [], (err, rows) => {
                if (err) {
                  throw err;
                }
                res.json(rows);
              });

              
              
           });
           
          
    

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
