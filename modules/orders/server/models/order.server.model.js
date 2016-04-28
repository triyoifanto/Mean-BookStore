'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  orderNo: {
    type: String
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  shippingAddr: {
    type: String
  },
  billingAddr: {
    type: String
  },
  shipping: {
    type: Number
  },
  subTotal: {
    type: Number
  },
  total: {
    type: Number
  },
  status:{
    type: String
  },
  paymentType: {
    type: String
  },
  creditCardNo: {
    type: String
  }
});

mongoose.model('Order', OrderSchema);
