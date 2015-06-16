var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var root = path.join(__dirname, '../');
var _ = require('underscore');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');
var db = mongoose.connection;


var Guest = require('./model/guest').Guest;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  Guest.find({}, function(err, docs) {
      if (!err){ 
          console.log('found docs', docs);
      } else {throw err;}
  });
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

//serve up home page
app.get('/', function (req, res) {
  res.sendfile(path.join(root, 'app/index.html'));
});

//serve up static contents
app.use(express.static(path.join(root, 'app')));

app.post('/rsvp/email', function(req, res){
  var email = req.body.email;

  //given email, create a new guest, need to change to create only if not found
  var newGuest = new Guest({email:email});
  newGuest.save(function(err, guest){
    res.end(email);  
  })
});

app.post('/rsvp/information', function(req, res){
  var info = req.body.info;

  Guest.findOne({email:info.email}, function(err, guest){
    if(err){
      console.log('error finding email', err);
    } else {
      _.extend(guest, info);
      guest.save(function(err, guest){
        console.log('guest saved');
        res.end('');
      })
    }
  })
})

var server = app.listen(3000, function () {
  // var host = server.address().address;
  // var port = server.address().port;
});