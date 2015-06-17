var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var root = path.join(__dirname, '../');
var _ = require('underscore');
var option = require('./option').option;

console.log(option);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp', option);
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

  Guest.findOne({email:email}, function(err, guest){
    console.log('error is', err);
    console.log('guest', guest);
    if(!guest){
      var newGuest = new Guest({email:email});
      newGuest.save(function(err, guest){
        res.end(email);  
      })
    } else {
      res.end(email);
    }
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

app.post('/rsvp/additionalguest', function(req, res){
  var email = req.body.email;
  var guestInfo = req.body.guestInfo;

  Guest.findOne({email:email}, function(err, guest){
    guest.guestInfo = guestInfo;
    guest.save(function(err, guest){
      console.log('Info saved, ', guest);
      res.end('')
    })
  })
})

var server = app.listen(9000, function () {
  // var host = server.address().address;
  // var port = server.address().port;
});