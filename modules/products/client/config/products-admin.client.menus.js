'use strict';

// Configuring the Articles module
angular.module('products.admin').run(['Menus',
  function (Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Products',
      state: 'admin.products'
    });
  }
]);