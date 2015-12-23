'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  name: String,
  desc: String,
  descAsHtml:{type:Boolean, default:false},
  price: Number,
  buyUrl: String,
  primaryImgUrl: String,
  gallery:[String],
  contributor:{type:Schema.ObjectId, ref:Schema.User},
  categories:{ type:[Schema.ObjectId], ref:Schema.CategorySchema},
  variables: [],
  active: Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
