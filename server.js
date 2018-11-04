var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/timestamp/:date_string?", function (req, res) { 
  var date = req.params.date_string || '';
  var regex = /\d{4,}-\d{2,}-\d{2,}/g;
  
  if(date.match(regex) || !isNaN(Number(date)) || (!req.params.date_string)){
    if (date == '') {
      date = new Date();
      res.json({'unix':date.getTime(), 'utc':date.toISOString()});
    } else if (isNaN(Number(date))){
      res.json({'unix':new Date(date).getTime(), 'utc':new Date(date).toISOString()})
    } else {
      res.json({'unix': new Date(+date).getTime(), 'utc': new Date(+date).toISOString()});
    }
  }else{
    res.json({'unix':null, 'utc':'Invalid Time'});
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
