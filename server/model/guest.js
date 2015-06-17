var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Guest Schema
 */

var GuestSchema = new Schema({
  email: {type: String, default : '', trim : true},
  firstname: {type: String, default : '', trim : true},
  lastname: {type: String, default : '', trim : true},
  isAttending: {type: Boolean, default: true},
  hasPermission: {type: Boolean, default: false},
  guests: {type: Number, default: 0},
  guestInfo: {type: Array, default: []},
  createdAt:{type : Date, default : Date.now}
});

exports.Guest = mongoose.model('Guest', GuestSchema);