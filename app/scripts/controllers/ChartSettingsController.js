'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSettingsController
 * @description
 * # ChartSettingsController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSettingsController', [
    '$stateParams',
    'Upload',
    function ($stateParams, Upload) {
      var controller = this;
      controller.id = $stateParams.id;

      this.upload = function (file) {
        file.upload = Upload.upload({
          url: 'http://localhost:3000/chartFile/upload',
          data: {id: controller.id, file: file},
        });

        file.upload.then(function (response) {
          // $timeout(function () {
          //   file.result = response.data;
          // });
        }, function (response) {
          if (response.status > 0)
            alert(response.status + ': ' + response.data);
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    }
  ]);
