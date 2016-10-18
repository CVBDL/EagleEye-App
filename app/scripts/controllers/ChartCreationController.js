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
    '$state',
    '$mdDialog',
    'GoogleChartsService',
    'EagleEyeWebService',
    function($state, $mdDialog, GoogleChartsService, EagleEyeWebService) {
      var friendlyUrlPrefix = 'c-';

      this.chartTypeOptions = GoogleChartsService.getChartTypeOptions();
      this.selectedChartTypeOption = this.chartTypeOptions[0];
      this.isStackedOptions = GoogleChartsService.getIsStackedOptions();
      this.formatStringOptions = GoogleChartsService.getFormatStringOptions();

      this.chart = {
        description: '',
        friendlyUrl: '',
        domainDataType: 'string',
        options: {
          title: '',
          hAxis: {
            title: '',
            format: ''
          },
          vAxis: {
            title: '',
            format: ''
          },
          combolines: '',
          isStacked: 'false',
          chartArea: {
            left: '',
            width: ''
          }
        }
      };

      this.save = function() {
        var savedData = angular.copy(this.chart, {}),
          chartArea = {};

        if (this.chart.friendlyUrl) {
          savedData.friendlyUrl = friendlyUrlPrefix + this.chart.friendlyUrl;
        }

        if (this.chart.options.chartArea.left !== '') {
          chartArea.left = this.chart.options.chartArea.left;
        }

        if (this.chart.options.chartArea.width !== '') {
          chartArea.width = this.chart.options.chartArea.width;
        }

        savedData.options.chartArea = chartArea;
        savedData.chartType = this.selectedChartTypeOption.value;
        savedData.datatable = GoogleChartsService.getChartDataTableSamples(this.selectedChartTypeOption.value.toLowerCase(), this.chart.domainDataType)

        EagleEyeWebService.createChart(JSON.stringify(savedData)).then(function(newChart) {
          $state.go('chartSettings', {
            id: newChart._id
          });

        }, function(error) {
          console.log(error);
        });
      };

      this.showHelp = function(ev) {
        $mdDialog.show({
          templateUrl: 'scripts/templates/chart-creation-help.tmpl.html',
          controller: ['$scope', function($scope) {
            $scope.cancel = function() {
              $mdDialog.cancel();
            };
          }],
          parent: angular.element(document.body),
          clickOutsideToClose: true
        });
      };

    }
  ]);
