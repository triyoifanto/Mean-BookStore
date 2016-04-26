'use strict';

angular.module('products.admin').controller('ProductsListController', ['$scope', '$filter', '$http', 'Authentication', 'ProductsService',
  function ($scope, $filter, $http, Authentication, ProductsService) {
    ProductsService.query(function (data) {
      $scope.products = data;
      $scope.buildPager();
      $scope.setPage();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 4;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.products, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };
  }
]);
