'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;

    // Some example string
    $scope.helloText = 'Mitrais MEAN Book Store';
    $scope.descriptionText = 'We really, really love books.';
  }
]);
