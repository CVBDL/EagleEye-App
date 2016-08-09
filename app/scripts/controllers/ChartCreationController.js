'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartCreationController
 * @description
 * # ChartCreationController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartCreationController', [
    '$scope',
    '$http',
    '$state',
    '$mdDialog',
    'GoogleChartsService',
    'EagleEyeWebService',
    function($scope, $http, $state, $mdDialog, GoogleChartsService, EagleEyeWebService) {
      var friendlyUrlPrefix = 'c-';

      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      this.selectedChartTypeOption = this.chartTypeOptions[0];

      this.settings = {
        description: '',
        friendlyUrl: '',
        majorAxisDataType: 'string'
      };

      this.chartOptions = {
        title: '',
        hAxis: {
          title: ''
        },
        vAxis: {
          title: ''
        },
        isStacked: 'false'
      };

      this.createChart = function() {
        var friendlyUrl = '';

        if (this.settings.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.settings.friendlyUrl;
        }

        var data = JSON.stringify({
          description: this.settings.description,
          chartType: this.selectedChartTypeOption.value,
          domainDataType: this.settings.majorAxisDataType,
          friendlyUrl: friendlyUrl,
          options: {
            title: this.chartOptions.title,
            hAxis: {
              title: this.chartOptions.hAxis.title
            },
            vAxis: {
              title: this.chartOptions.vAxis.title
            },
            isStacked: this.chartOptions.isStacked === 'true'
          },
          datatable: GoogleChartsService.getChartDataTableSamples(this.selectedChartTypeOption.value.toLowerCase(), this.settings.majorAxisDataType)
        });

        EagleEyeWebService.createChart(data).then(function(newChart) {
          $state.go('chart', {
            id: newChart._id
          });

        }, function(error) {
          console.log(error);
        });
      };

      this.showHelp = function(name, ev) {
        // var
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.body))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
        );
      }
    }
  ]);
