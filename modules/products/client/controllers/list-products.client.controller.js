'use strict';

angular.module('products.admin').controller('ProductsListController', ['$scope', '$filter', 'ProductsService',
  function ($scope, $filter, ProductsService) {
    ProductsService.query(function (data) {
      $scope.products = data;
      $scope.buildPager();
      $scope.fieldOption = 'CreatedDate';
      $scope.orderOption = 'true';
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 4;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('orderBy')($scope.products, $scope.fieldSorting);
      $scope.filteredItems = $filter('filter')($scope.filteredItems, {
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

    $scope.fieldSortingChanged = function () {
      $scope.fieldSorting = $scope.fieldOption;
      
      if($scope.orderOption === "true") {
        $scope.fieldSorting = '-' + $scope.fieldSorting;
      }

      $scope.figureOutItemsToDisplay();
    };

    $scope.orderSortingChanged = function () {
      if($scope.orderOption === "true") {
        $scope.fieldSorting = '-' + $scope.fieldSorting;
      } else {
        $scope.fieldSorting = $scope.fieldOption;
      }

      $scope.figureOutItemsToDisplay();
    };
  }
]);
