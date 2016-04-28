'use strict';

angular
  .module('products')
  .controller('ProductsViewController', ['$scope', '$state', 'productResolve', '$window', function ProductsViewController($scope, $state, productResolve, $window) {
    $scope.product = productResolve;
    $scope.imageURL = $scope.product.Image;

    if(!$scope.imageURL){
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
    }

    $scope.getMaxQty = function(num) { return new Array(num); };
  }
]);
