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
    '$state',
    '$stateParams',
    'Upload',
    function ($state, $stateParams, Upload) {
      var controller = this;
      controller.id = $stateParams.id;
      controller.type = $stateParams.type;

      this.goViewChart = function(){
        $state.go('chart', {id : controller.id});
      };

      this.goViewCharts = function(){
        $state.go('charts');
      };

      this.upload = function (file) {
        file.upload = Upload.upload({
          url: controller.type == "chart" ? 'http://localhost:3000/chartFile/upload' : 'http://localhost:3000/chartFile/uploadImage',
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
