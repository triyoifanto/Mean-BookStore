(function () {
  'use strict';

  angular
    .module('products.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.products', {
        url: '/products',
        templateUrl: 'modules/products/client/views/admin/list-products.client.view.html',
        controller: 'ProductsListController'
      })
      .state('admin.products-view', {
        url: '/products/:productId',
        templateUrl: 'modules/products/client/views/admin/view-product.admin.client.view.html',
        controller: 'ProductsController',
        resolve: {
          productResolve: getProduct
        },
        data: {
          roles: ['user', 'admin', 'guest'],
          pageTitle: 'Products View'
        }
      })
      .state('admin.products-create', {
        url: '/products/products-create',
        templateUrl: 'modules/products/client/views/admin/form-products.client.view.html',
        controller: 'ProductsController',
        resolve: {
          productResolve: newProduct
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Products Create'
        }
      })
      .state('admin.products-edit', {
        url: '/products/:productId/edit',
        templateUrl: 'modules/products/client/views/admin/form-edit-products.client.view.html',
        controller: 'ProductsController',
        resolve: {
          productResolve: getProduct
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Product {{ productResolve.title }}'
        }
      })
      .state('admin.products-bookcover', {
        url: '/productsUpload',
        controller: 'ProductsController'
      });
  }

  getProduct.$inject = ['$stateParams', 'ProductsService'];

  function getProduct($stateParams, ProductsService) {
    return ProductsService.get({
      productId: $stateParams.productId
    }).$promise;
  }

  newProduct.$inject = ['ProductsService'];

  function newProduct(ProductsService) {
    return new ProductsService();
  }
}());
