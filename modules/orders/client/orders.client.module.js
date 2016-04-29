(function (app) {
  'use strict';

  app.registerModule('orders', ['core']);
  app.registerModule('orders.admin', ['ui.bootstrap.pagination']);
})(ApplicationConfiguration);
