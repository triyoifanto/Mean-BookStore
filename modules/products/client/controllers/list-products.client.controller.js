'use strict';

angular.module('products.admin').controller('ProductsListController', ['$scope', '$filter', 'Authentication', 'ProductsService',
  function ($scope, $filter, Authentication, ProductsService) {
    ProductsService.query(function (data) {
      $scope.products = [{ title: 'Book A', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book B', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book C', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book D', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book E', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book F', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book G', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book H', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book I', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book J', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book K', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book L', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book M', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book L', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }];
      $scope.products = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 20;
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
