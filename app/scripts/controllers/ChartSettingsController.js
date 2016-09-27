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
    'EagleEyeWebService',
    'Upload',
    function ($state, $stateParams, EagleEyeWebService, Upload) {
      var controller = this;
      controller.id = $stateParams.id;

      this.isLoading = true;

      this.excelTemplateDownloadUrl = EagleEyeWebService.getExcelTemplateDownloadUrl(controller.id);

      this.getChartDataById = function(id) {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chartType = data.chartType;
          controller.type = data.type;
          controller.isLoading = false;
          controller.title = data.options.title;
        });
      };

      this.goViewChart = function() {
        $state.go('chart', {id : controller.id});
      };

      this.goViewCharts = function(){
        $state.go('charts');
      };

      this.upload = function (file) {
        EagleEyeWebService.uploadFile(file, controller.type, controller.id);
      }

      this.getChartDataById(controller.id);
    }
  ]);
