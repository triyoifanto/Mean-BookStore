'use strict';

angular.module('products.admin').controller('ProductController', ['$scope', '$state', 'Authentication', 'Products',
  function ($scope, $state, Authentication, productResolve) {
    $scope.authentication = Authentication;
    $scope.product = productResolve;

    $scope.find = function() {
      $scope.articles = Products.query();
    };

    $scope.findOne = Products() {
      $scope.article = Articles.get({
        productId: $routeParams.productId
      });
    };

    $scope.create = function(isValid){
      if(!isValid){
        $scope.$broadcase('show-errors-check-validity', 'productForm');

        return false;
      }

      // TODO: state go to product form
      var product = new Products({
        title: this.title,
        author: this.author,
        description: this.description,
        price: this.price,
        category: this.category,
        stock: this.stock,
        image: this.image,
        status: this.status
      });

      product.$save(function(response) {
        $location.path('product/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function (product) {
      if (confirm('Are you sure you want to delete this product?')) {
        if (product) {
          product.$remove();

          $scope.products.splice($scope.products.indexOf(product), 1);
        } else {
          $scope.product.$remove(function () {
            $state.go('admin.products');
          });
        }
      }
    };

    $scope.update = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');

        return false;
      }

      var product = $scope.product;

      product.$update(function () {
        $state.go('admin.product', {
          productId: product._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
  }
]);
