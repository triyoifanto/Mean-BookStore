'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Some example string
    $scope.helloText = 'Welcome in MEAN Book Store';
    $scope.descriptionText = 'We have 14 million titles and free delivery worldwide to over 100 countries. We also really, really love books.';

  }
]);
