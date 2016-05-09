'use strict';

angular.module('products.admin').controller('ProductsListController', ['$scope', '$filter', 'ProductsService', '$location',
  function ($scope, $filter, ProductsService, $location) {
    ProductsService.query(function (data) {
      $scope.products = data;
      $scope.currentLocation = $location.path();
      $scope.fieldOption = 'CreatedDate';
      $scope.orderOption = 'true';
      //$scope.isReadMore = false;
      //$scope.isShortDesc = true;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 4;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('orderBy')($scope.products, $scope.fieldSorting);
      
      if($scope.currentLocation === '/') {
        $scope.filteredItems = $filter('filter')($scope.filteredItems, {
          'Status': 'instock'
        });
      }

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
      
      if($scope.orderOption === 'true') {
        $scope.fieldSorting = '-' + $scope.fieldSorting;
      }

      $scope.figureOutItemsToDisplay();
    };

    $scope.orderSortingChanged = function () {
      if($scope.orderOption ==='true') {
        $scope.fieldSorting = '-' + $scope.fieldSorting;
      } else {
        $scope.fieldSorting = $scope.fieldOption;
      }

      $scope.figureOutItemsToDisplay();
    };

    // button read more or less
    /*$scope.readMore = function(isReadMore, $event){
      $scope.isReadMore = isReadMore;
      $event.stopPropagation();
    };*/
  }
]);
