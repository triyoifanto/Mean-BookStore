(function (app) {
  'use strict';

  app.registerModule('orders');
  app.registerModule('orders.admin', ['core.admin']);
})(ApplicationConfiguration);
