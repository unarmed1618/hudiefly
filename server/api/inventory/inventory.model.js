'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var InventorySchema = new Schema({
  product: {type:Schema.ObjectId, ref:Schema.Product},
  amount: Number,
  active: Boolean
});

module.exports = mongoose.model('Inventory', InventorySchema);
