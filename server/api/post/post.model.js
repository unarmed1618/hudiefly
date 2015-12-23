'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  desc: String,
  date: {type:Date, default:Date.now()},
  poster: {type:Schema.ObjectId, ref: Schema.User},
  body: String
});

module.exports = mongoose.model('Post', PostSchema);
