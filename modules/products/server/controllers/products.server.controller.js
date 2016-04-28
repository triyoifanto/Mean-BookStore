'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Product = mongoose.model('Product'),
  multer = require('multer'),
  config = require(path.resolve('./config/config')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Product
 */
exports.create = function (req, res) {
  var product = new Product(req.body);
  product.Title = req.body.Title;
  product.Author = req.body.Author;
  product.Category = req.body.Category;
  product.Description = req.body.Description;
  product.Price = req.body.Price;
  product.Image = req.body.Image;
  product.Stock = req.body.Stock;
  product.Status = req.body.Status;

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

exports.bookcoverUpload = function (req, res) {
  var upload = multer(config.uploads.bookCoverUpload).single('newBookCover');
  var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

  // Filtering to upload only images
  upload.fileFilter = profileUploadFileFilter;

  upload(req, res, function (uploadError) {
    if(uploadError) {
      return res.status(400).send({
        message: 'Error occurred while uploading profile picture'
      });
    } else {
      res.json(config.uploads.bookCoverUpload.dest + req.file.filename);        
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

  product.Title = req.body.Title;
  product.Author = req.body.Author;
  product.Category = req.body.Category;
  product.Description = req.body.Description;
  product.Price = req.body.Price;
  product.Image = req.body.Image;
  product.Stock = req.body.Stock;
  product.Status = req.body.Status;

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
