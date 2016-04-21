'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('products', ['core']);
ApplicationConfiguration.registerModule('products.admin', ['core.admin']);
ApplicationConfiguration.registerModule('products.admin.routes', ['core.admin.routes']);