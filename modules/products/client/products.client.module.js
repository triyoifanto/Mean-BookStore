'use strict';

ApplicationConfiguration.registerModule('products', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
ApplicationConfiguration.registerModule('products.routes', ['core.admin.routes', 'ui.bootstrap']);
ApplicationConfiguration.registerModule('products.admin', ['ui.bootstrap.pagination']);
ApplicationConfiguration.registerModule('products.admin.routes', ['core.admin.routes', 'ui.bootstrap']);