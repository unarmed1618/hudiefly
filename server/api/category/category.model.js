'use strict';
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

//Screw model heavy types. I'm using mixed type for now so I can make this just work. Each category has a tree sub to it.
var CategorySchema = new Schema({
	name:String,
	inherits:{type:[ObjectId], ref:CategorySchema},
	menu: Boolean
},{versionKey:false});
module.exports = mongoose.model('Category', CategorySchema);
