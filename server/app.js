var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var root = path.join(__dirname, '../');
var _ = require('underscore');
var option = require('./option').option;
var winston = require('winston');

console.log(option);
var mongoose = require('mongoose');
mongoose.connect('mongodb://root@localhost:27017/myapp', option);
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
  var isAttending = req.body.isAttending;

  //given email, create a new guest, need to change to create only if not found

  Guest.findOne({email:email}, function(err, guest){
    console.log('error is', err);
    console.log('guest', guest);
    if(!guest){
      var newGuest = new Guest({email:email, isAttending:isAttending});
      newGuest.save(function(err, guest){
        var guest = JSON.stringify(guest);
        res.end(guest);  
      })
    } else {
      guest.isAttending = isAttending;
      guest.save(function(err, guest){
        var guest = JSON.stringify(guest);
        res.end(guest);
      })
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
        var guest = JSON.stringify(guest);
        res.end(guest);
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

app.get('/guests/allguests', function(req, res){
  Guest.find({}, function(err, guests){
    console.log(guests);
    var guests = JSON.stringify(guests);
    res.end(guests);
  })
})

app.post('/guests/hasPermission', function(req, res){
  var email = req.body.email;

  Guest.findOne({email:email}, function(err, guest){
    if(guest){
    var result = {
      permission: guest.hasPermission
    }
    res.end(JSON.stringify(result));
    } else {
        var result = {
      permission: false
    }
    res.end(JSON.stringify(result))
    }
  })
})


app.post('/guests/changePermission', function(req, res){
  var email = req.body.email;

  Guest.findOne({email:email}, function(err, guest){

    if(guest.hasPermission){
      guest.hasPermission = false;
    } else {
      guest.hasPermission = true;
    }
    guest.save(function(data){
      console.log(data);
      res.end('');  
    })
  })
})



var server = app.listen(9000, function () {
  // var host = server.address().address;
  // var port = server.address().port;
});
