'use strict';

// Products service used for communicating with the users REST endpoint
angular.module('products').factory('Products', ['$resource',
  function ($resource) {
    return $resource('api/products', {}, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

//TODO this should be Products service
angular.module('products.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

angular.module('products.admin').factory('Admin', ['$resource',
  function ($resource) {
    return $resource('api/products/add', {}, {
      add: {
        method: 'POST'
      }
    });
  }
]);
