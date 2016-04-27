(function () {
  'use strict';

  angular
    .module('products')
    .factory('ProductsService', ProductsService);

  ProductsService.$inject = ['$resource'];

  function ProductsService($resource) {
    return $resource('api/products/:productId', {
      productId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
