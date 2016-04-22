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
      .state('admin.products.create', {
        url: '/product-create',
        templateUrl: 'modules/products/client/views/form-products.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: newProduct
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Products Create'
        }
      })
      .state('admin.products-edit', {
        url: '/:productId/edit',
        templateUrl: 'modules/products/client/views/form-products.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Product {{ productResolve.title }}'
        }
      })
      .state('admin.products-view', {
        url: '/:productId',
        templateUrl: 'modules/products/client/views/view-product.client.view.html',
        controller: 'ProductsController',
        controllerAs: 'vm',
        resolve: {
          productResolve: getProduct
        },
        data: {
          pageTitle: 'Product {{ productResolve.title }}'
        }
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
