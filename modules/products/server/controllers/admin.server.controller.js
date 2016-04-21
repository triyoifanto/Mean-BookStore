'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var getErrorMessage = function(err) {
  if (err.errors) {
    for (var errName in err.errors) {
      if (err.errors[errName].message) return err.errors[errName].message;
    }
  } else {
    return 'Unknown server error';
  }
};

/**
 * Show the current Product
 */
exports.read = function (req, res) {
  res.json(req.product);
};

exports.create = function(req, res) {
  var product = new Product(req.body);

  product.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      res.json(product);
    }
  });
};

/**
 * Update a Product
 */
exports.update = function (req, res) {
  var product = req.product;

  //For security purposes only merge these parameters
  product.title = req.body.title;
  product.author = req.body.author;
  product.price = req.body.price;
  product.description = req.body.description;
  product.stock = req.body.stock;

  product.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(product);
  });
};

/**
 * Delete a product
 */
exports.delete = function (req, res) {
  var product = req.product;

  product.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(product);
  });
};

/**
 * List of products
 */
exports.list = function (req, res) {
  Product.find().sort('-title').populate('product', 'title').exec(function (err, products) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(products);
  });
};

/**
 * Product middleware
 */
exports.productByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Product is not found'
    });
  }

  Product.findById(id).exec(function (err, product) {
    if (err) {
      return next(err);
    } else if (!product) {
      return next(new Error('Failed to load product ' + id));
    }

    req.product = product;
    next();
  });
};
