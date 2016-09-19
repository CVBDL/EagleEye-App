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
          title: '',
          isPercent: 'false'
        },
        vAxis: {
          title: '',
          isPercent: 'false'
        },
        isStacked: 'false',
        chartArea: {
          left: '',
          width: ''
        }
      };

      this.createChart = function() {
        var friendlyUrl = '';
        var formatePercentV = '';
        var formatePercentH = '';

        if (this.settings.friendlyUrl) {
          friendlyUrl = friendlyUrlPrefix + this.settings.friendlyUrl;
        }

        if (this.chartOptions.vAxis.isPercent === 'true') {
          formatePercentV = 'percent';
        }

        if (this.chartOptions.hAxis.isPercent === 'true') {
          formatePercentV = 'percent';
        }

        var _chartArea = {};

        if (this.chartOptions.chartArea.left !== '') {
          _chartArea.left = this.chartOptions.chartArea.left;
        }
        if (this.chartOptions.chartArea.width !== '') {
          _chartArea.width = this.chartOptions.chartArea.width;
        }

        var data = JSON.stringify({
          description: this.settings.description,
          chartType: this.selectedChartTypeOption.value,
          domainDataType: this.settings.majorAxisDataType,
          friendlyUrl: friendlyUrl,
          options: {
            title: this.chartOptions.title,
            hAxis: {
              title: this.chartOptions.hAxis.title,
              format: formatePercentH
            },
            vAxis: {
              title: this.chartOptions.vAxis.title,
              format: formatePercentV
            },
            combolines: this.chartOptions.combolines,
            isStacked: this.chartOptions.isStacked === 'true',
            chartArea: _chartArea
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

      this.showLines = function() {
        if (this.selectedChartTypeOption.value.toLowerCase() == "combochart") {
          return true;
        } else {
          return false;
        }
      };
    }
  ]);
