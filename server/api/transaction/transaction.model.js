'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	cart: { type: Schema.ObjectId, ref: Schema.Cart},
	user: { type: Schema.ObjectId, ref: Schema.User},
	date: { type: Date, default:Date.now()},
	shipping: { type: Schema.ObjectId, ref: Schema.Shipping},
	shipped: Boolean,
	completed: Boolean
});

module.exports = mongoose.model('Transaction', TransactionSchema);
