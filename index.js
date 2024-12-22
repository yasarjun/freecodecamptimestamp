// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isDate(dateString){
  try{
    newDate = new Date(dateString);
    console.log('------------ return true');
    return (newDate instanceof Date instanceof Date && !isNaN(newDate.getTime()));
  }
  catch(err){
    console.log('------------ return false');
    return false;
  }
}
Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };

app.get("/api/:date", (req, res)=>{
  try{
    let newDate;
    let unixts;
    if (isDate(req.params.date)){
      
      newDate = new Date(req.params.date);
      console.log('------------------ here '+newDate.toString());
      unixts = newDate.getUnixTime() * 1000;
    }
    else{
      newDate = new Date("2015-12-25");
      unixts = 1451001600000;
    }
  res.json({"unix": unixts, "utc": newDate.toUTCString()});
  }
  catch(err){
    console.error(err);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
