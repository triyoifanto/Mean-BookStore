'use strict';

ApplicationConfiguration.registerModule('products', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
ApplicationConfiguration.registerModule('products.admin');
ApplicationConfiguration.registerModule('products.admin.routes', ['core.admin.routes']);