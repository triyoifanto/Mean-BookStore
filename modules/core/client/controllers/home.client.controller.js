'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Some example string
    $scope.helloText = 'Mitrais MEAN Book Store';
    $scope.descriptionText = 'We really, really love books.';

    $scope.products = [{ title: 'Book A', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book B', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book C', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book D', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book E', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book F', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book G', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book H', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, {	    	title: 'Book I', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book J', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book K', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book L', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book M', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }, { title: 'Book D', author: 'Ifan', Price: 10, image: 'modules/products/client/img/no-cover.jpg' }];
  }
]);
