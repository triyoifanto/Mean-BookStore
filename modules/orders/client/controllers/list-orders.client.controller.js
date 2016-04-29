(function () {
  'use strict';

  angular
    .module('orders')
    .controller('OrdersListController', OrdersListController);

  OrdersListController.$inject = ['$filter', '$state','OrdersService'];

  function OrdersListController($filter, $state, OrdersService) {
    var vm = this;

    OrdersService.query(function (data){
      vm.orders = data;
      vm.buildPager();
    });

    vm.buildPager = function () {
      vm.pagedItems = [];
      vm.itemsPerPage = 2;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay(); 
    };

    vm.figureOutItemsToDisplay = function () {
      vm.filteredItems = $filter('filter')(vm.orders, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    };

    vm.pageChanged = function () {
      vm.figureOutItemsToDisplay();
    };

    // Remove existing Order
    vm.remove = function remove(order) {
      if (confirm('Are you sure you want to delete?')) {
        order.$remove(vm.figureOutItemsToDisplay());
      }
    };
  }
})();
