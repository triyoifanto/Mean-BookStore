(function () {
  'use strict';

  angular
    .module('products.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('products-view', {
        url: '/products/:productId',
        templateUrl: 'modules/products/client/views/view-product.client.view.html',
        controller: 'ProductsViewController',
        resolve: {
          productResolve: getProduct
        }
      });
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];

  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }
}());
