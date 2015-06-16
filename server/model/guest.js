var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Guest Schema
 */

var GuestSchema = new Schema({
  email: {type : String, default : '', trim : true},
  firstname: {type : String, default : '', trim : true},
  lastname: {type : String, default : '', trim : true},
  guests: {type: Number, default: 0},
  createdAt  : {type : Date, default : Date.now}
});


exports.Guest = mongoose.model('Guest', GuestSchema);