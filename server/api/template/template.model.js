'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TemplateSchema = new Schema({
  name: String,
  content: String,
  dateCreated: {type:Date, default:Date.now()},
  path: {type:String, index:true},
  site: String
}, {versionKey:false});

module.exports = mongoose.model('Template', TemplateSchema);
