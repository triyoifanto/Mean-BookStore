'use strict';

// Setting up route
angular.module('products.admin.routes').config(['$stateProvider',
  function ($stateProvider) {
    $stateProvider
      .state('admin.products', {
        url: '/products',
        templateUrl: 'modules/products/client/views/admin/list-products.client.view.html',
        controller: 'ProductListController'
      })
      /*.state('admin.products', {
        url: '/products/:productId',
        templateUrl: 'modules/products/client/views/admin/view-products.client.view.html',
        controller: 'ProductController',
        resolve: {
          productResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              productId: $stateParams.productId
            });
          }]
        }
      })*/
      .state('admin.products-add', {
        url: '/products/add',
        templateUrl: 'modules/products/client/views/admin/add-products.client.view.html',
        controller: 'ProductController'
      })
      /*.state('admin.product-edit', {
        url: '/products/:productId/edit',
        templateUrl: 'modules/products/client/views/admin/edit-product.client.view.html',
        controller: 'ProductController',
        resolve: {
          productResolve: ['$stateParams', 'Admin', function ($stateParams, Admin) {
            return Admin.get({
              productId: $stateParams.productId
            });
          }]
        }
      })*/;
  }
]);
