'use strict';

angular
  .module('products.admin')
  .controller('ProductsController', ['$scope', '$state', '$timeout', 'productResolve', '$window', 'Authentication', 'FileUploader', function ProductsController($scope, $state, $timeout, productResolve, $window, Authentication, FileUploader) {
    $scope.product = productResolve;
    $scope.authentication = Authentication;
    $scope.imageURL = $scope.product.Image;
    $scope.imageURL2 = $scope.product.SecondaryImage;
    $scope.fileReaderSupported = window.FileReader !== null;
    $scope.isCoverDefault = false;
    $scope.isReadMore = false;
    $scope.isShortDesc = true;
    $scope.completeDescription = productResolve.Description;
    $scope.selectedImage = productResolve.Image;

    if($scope.product.Description !== undefined && $scope.product.Description.length > 250) {
      $scope.product.Description = $scope.completeDescription.substr(0, 250);
      $scope.isShortDesc = false;
    }

    if(!$scope.imageURL){
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';      
      $scope.isCoverDefault = true;
    }

    if(!$scope.imageURL2){
      $scope.imageURL2 = '/modules/products/client/img/no-cover.jpg';      
    }

    if($scope.imageURL === '/modules/products/client/img/no-cover.jpg'){
      $scope.isCoverDefault = true;
    }

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/productsUpload',
      alias: 'newBookCover'
    });

    $scope.uploader2 = new FileUploader({
      url: 'api/productsUpload',
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

    $scope.uploader2.filters.push({
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

    $scope.uploader2.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            $scope.imageURL2 = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;

      // Populate user object
      $scope.product.Image = productResolve = response;      
      $scope.isCoverDefault = false;

      // Clear upload buttons
      $scope.cancelUpload();
    };

    $scope.uploader2.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success2 = true;

      // Populate user object
      $scope.product.SecondaryImage = productResolve = response;

      // Clear upload buttons
      $scope.cancelUpload2();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.errorImage = response.message;
    };

    $scope.uploader2.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload2();

      // Show error message
      $scope.errorImage2 = response.message;
    };

    // Change book cover
    $scope.uploadBookCover = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    $scope.uploadBookCover2 = function () {
      // Clear messages
      $scope.success2 = $scope.error = null;

      // Start upload
      $scope.uploader2.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue(); 

      $scope.imageURL = $scope.product.Image;

      if($scope.imageURL === undefined) {
        $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
        $scope.isCoverDefault = true;
      }
    };

    $scope.cancelUpload2 = function () {
      $scope.uploader2.clearQueue(); 

      $scope.imageURL2 = $scope.product.SecondaryImage;

      if($scope.imageURL2 === undefined) {
        $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
      }
    };

    // Remove existing Product
    $scope.remove = function() {
      if ($window.confirm('Are you sure you want to delete?')) {
        $scope.product.$remove(function(){
          $state.transitionTo('admin.products', {}, { reload:true });
        }, function(errorResponse){
          $scope.error = errorResponse.data.message;
        });
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
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
      $scope.imageURL2 = '/modules/products/client/img/no-cover.jpg';
      $scope.error = null;
      $scope.success = false;
    };  

    // remove book cover
    $scope.removeCover = function(){
      $scope.imageURL = '/modules/products/client/img/no-cover.jpg';
      $scope.isCoverDefault = true;
      $scope.product.Image = $scope.imageURL;
    };

    $scope.removeCover2 = function(){
      $scope.imageURL2 = '/modules/products/client/img/no-cover.jpg';
      $scope.product.SecondaryImage = $scope.imageURL2;
    };

    // read more or less button
    $scope.readMore = function(isReadMore){
      $scope.isReadMore = isReadMore;
      $scope.product.Description = $scope.completeDescription.substr(0, 250);

      if(isReadMore){
        $scope.product.Description = $scope.completeDescription;
      }
    };

    $scope.chooseImage = function(selectedImage){
      $scope.selectedImage = selectedImage;
    };
  }
]);
