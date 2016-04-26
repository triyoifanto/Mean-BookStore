'use strict';

angular
  .module('products.admin')
  .controller('ProductsController', ['$scope', '$state', '$timeout', 'productResolve', '$window', 'Authentication', 'FileUploader', function ProductsController($scope, $state, $timeout, productResolve, $window, Authentication, FileUploader) {
    $scope.product = productResolve;
    $scope.authentication = Authentication;
    $scope.imageURL = $scope.product.Image;
    $scope.fileReaderSupported = window.FileReader !== null;

    if(!$scope.imageURL){
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
    }

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/products/',
      alias: 'newBookCover'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.product = Authentication.product = response;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change book cover
    $scope.uploadBookCover = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      $scope.imageURL = null;
    };

    // Remove existing Product
    $scope.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        $scope.product.$remove($state.transitionTo('admin.products', {}, { reload:true }));
      }
    };

    // Add new product
    $scope.create = function(isValid){
      // check whether form is valid or not
      if(!isValid){
        $scope.$broadcast('show-errors-check-validity', 'productForm');
        return false;
      }

      // set product model to newProduct variable
      var newProduct = $scope.product; 
      newProduct.Image = $scope.imageURL;    

      // save newProduct, redirect to detail page if success, otherwise display an error message
      newProduct.$save(function(){
        $state.go('admin.products-view', {
          productId: newProduct._id
        });
      }, function (errorResponse){
        $scope.error = errorResponse.data.message;
      });
    };

    // Update Product
    $scope.update = function(isValid) {
      // check whether form is valid or not
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'productForm');
        return false;
      }

      // set product model to product variable
      var product = $scope.product;

      // update product, redirect to detail page if success, otherwise display an error message
      product.$update(function () {
        $state.go('admin.products-view', {
          productId: product._id
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };  

    // Clear form
    $scope.clearForm = function(){
      $scope.productForm.$setPristine();
      $scope.product = null;
      $scope.imageURL = null;
    };  
  }
]);
