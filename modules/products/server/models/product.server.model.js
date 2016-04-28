'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  Title:{
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in book title']
  },
  Author:{
    type: String,
    trim: true,
    default: '',
    validate: [validateLocalStrategyProperty, 'Please fill in the author']
  },
  Description:{
    type: String,
    trim: true,
    default: ''
  },
  Category:{
    type: String,
    trim: true,
    default: 'General'
  },
  Image:{
    type: String,
    trim: true,
    default: 'modules/products/client/img/no-cover.jpg'
  },
  Price:{
    type: Number,
    default: 0,
    Min: 0,
    Max: 999999999
  },
  Stock:{
    type: Number,
    default: 0,
    Min: 0,
    Max: 999999999
  },
  Status:{
    type: String,
    trim: true,
    default: ''
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  ModifiedDate: {
    type: Date,
    default: Date.now
  }
});


mongoose.model('Product', ProductSchema);
