'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Product
 */
exports.create = function (req, res) {
  var product = new Product(req.body);
  /*product.title = req.body.title;
  product.author = req.body.author;
  product.category = req.body.category;
  product.description = req.body.description;
  product.price = req.body.price;
  product.image = req.body.image;
  product.stock = req.body.stock;
  product.status = req.body.status;*/

  if(!product){
    return res.status(400).send({
      message: 'please insert the product data '
    });
  }

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: 'test ' + errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Show the current Product
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var product = req.product ? req.product.toJSON() : {};

  // Add a custom field to the Product, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Product model.
  product.isCurrentUserOwner = !!(req.user && product.user && product.user._id.toString() === req.user._id.toString());

  res.json(product);
};

/**
 * Update an Product
 */
exports.update = function (req, res) {
  var product = req.product;

  product.title = req.body.title;
  product.author = req.body.author;
  product.category = req.body.category;
  product.description = req.body.description;
  product.price = req.body.price;
  product.image = req.body.image;
  product.stock = req.body.stock;
  product.status = req.body.status;

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Delete an product
 */
exports.delete = function (req, res) {
  var product = req.product;

  product.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * List of Products
 */
exports.list = function (req, res) {
  Product.find().sort('-title').populate('product', 'title').exec(function (err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(products);
    }
  });
};

/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is invalid'
    });
  }

  Product.findById(id).populate('user', 'displayName').exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return res.status(404).send({
        message: 'No product with that identifier has been found'
      });
    }
    req.product = product;
    next();
  });
};
