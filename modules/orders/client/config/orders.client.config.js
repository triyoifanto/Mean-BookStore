(function () {
  'use strict';

  angular
    .module('orders.admin')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Configuring the Order module
    // Add the dropdown list item  on admin menu
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Orders',
      state: 'orders.list'
    });
  }
})();

