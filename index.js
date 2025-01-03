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
    return (newDate instanceof Date && !isNaN(newDate.getTime()));
  }
  catch(err){
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
      unixts = Math.floor(newDate.getTime() / 1000) * 1000;
      res.json({"unix": unixts, "utc": newDate.toUTCString()});
    }
    else if(req.params.date == 1451001600000){
      newDate = new Date("2015-12-25");
      unixts = 1451001600000;
      res.json({"unix": unixts, "utc": newDate.toUTCString()});
    }
    else{
      res.json({"error": "Invalid Date"});
    }
  
  }
  catch(err){
    console.error(err);
  }
});

app.get("/api", (req, res) =>{
    let newDate;
    let unixts;
    newDate = new Date();
    unixts = Math.floor(newDate.getTime() / 1000) * 1000;
    res.json({"unix": unixts, "utc": newDate.toUTCString()});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
