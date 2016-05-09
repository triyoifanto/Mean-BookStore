'use strict';

angular
  .module('products')
  .controller('ProductsViewController', ['$scope', '$state', 'productResolve', '$window', function ProductsViewController($scope, $state, productResolve, $window) {
    $scope.product = productResolve;
    $scope.imageURL = $scope.product.Image;
    $scope.isReadMore = false;
    $scope.completeDescription = productResolve.Description;
    $scope.isShortDesc = true;
    $scope.selectedImage = productResolve.Image;

    if($scope.product.Description.length > 250) {
      $scope.product.Description = $scope.completeDescription.substr(0, 250);
      $scope.isShortDesc = false;
    }

    if(!$scope.imageURL){
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
    }

    $scope.getMaxQty = function(num) { return new Array(num); };

    // read more or less button
    $scope.readMore = function(isReadMore){
      $scope.isReadMore = isReadMore;
      $scope.product.Description = $scope.completeDescription.substr(0, 250);

      if(isReadMore){
        $scope.product.Description = $scope.completeDescription;
      }
    };

    $scope.chooseImage = function(selectedImage){
      $scope.selectedImage = selectedImage;
    }
  }
]);
