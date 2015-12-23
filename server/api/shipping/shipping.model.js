'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ShippingSchema = new Schema({
  name: String,
  desc: String,
  price: Number
});

module.exports = mongoose.model('Shipping', ShippingSchema);
