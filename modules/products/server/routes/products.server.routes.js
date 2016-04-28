'use strict';

/**
 * Module dependencies
 */
var productPolicy = require('../policies/products.server.policy'),
  products = require('../controllers/products.server.controller');

module.exports = function (app) {
  // Products collection routes
  app.route('/api/products').all(productPolicy.isAllowed)
    .get(products.list)
    .post(products.create)
    .get(products.create);

  // Single product routes
  app.route('/api/products/:productId').all(productPolicy.isAllowed)
    .get(products.read)
    .put(products.update)
    .delete(products.delete);

  app.route('/api/productsUpload')
    .post(products.bookcoverUpload);

  // Finish by binding the product middleware
  app.param('productId', products.productByID);
};
