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

      this.stackOptions = [{
        value: true,
        label: 'Yes'
      }, {
        value: false,
        label: 'No'
      }];

      this.formatOptions = [{
        value: 'percent',
        label: 'Yes'
      }, {
        value: '',
        label: 'No'
      }];

      this.settings = {
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
        var savedData = angular.copy(this.settings, {}),
          chartArea = {};

        if (this.settings.friendlyUrl) {
          savedData.friendlyUrl = friendlyUrlPrefix + this.settings.friendlyUrl;
        }

        if (this.settings.options.chartArea.left !== '') {
          chartArea.left = this.settings.options.chartArea.left;
        }

        if (this.settings.options.chartArea.width !== '') {
          chartArea.width = this.settings.options.chartArea.width;
        }

        savedData.options.chartArea = chartArea;
        savedData.chartType = this.selectedChartTypeOption.value;
        savedData.datatable = GoogleChartsService.getChartDataTableSamples(this.selectedChartTypeOption.value.toLowerCase(), this.settings.domainDataType)

        EagleEyeWebService.createChart(JSON.stringify(savedData)).then(function(newChart) {
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
    }
  ]);
