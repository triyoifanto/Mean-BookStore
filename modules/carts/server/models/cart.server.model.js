'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Cart Schema
 */
var CartSchema = new Schema({
  CartProduct: {
    type: Schema.ObjectId,
    ref: 'Product'
  },
  CartQty: {
    type: Number,
    default: 0,
    required: 'Please fill Cart name',
    trim: true
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  CreatedBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  ModifiedDate: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Cart', CartSchema);
