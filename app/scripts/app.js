'use strict';

/**
 * @ngdoc overview
 * @name eagleeye
 * @description
 * `eagleeye` module.
 *
 * Main module of the application.
 */
angular
  .module('eagleeye', [
    'ngMaterial',
    'ngMessages',
    'ui.router',
    'ngFileUpload'
  ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'GoogleChartsServiceProvider',
    function($stateProvider, $urlRouterProvider, GoogleChartsServiceProvider) {
      $stateProvider
        .state('root', {
          url: '',
          abstract: true,
          template: '<ui-view></ui-view>',
          controller: 'RootController',
          resolve: {
            config: ['$http', function($http) {
              return $http.get('../config.json');
            }]
          }
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'home',
          parent: 'root'
        })
        .state('charts', {
          url: '/charts',
          templateUrl: 'views/charts.html',
          controller: 'ChartsController',
          controllerAs: 'charts',
          parent: 'root'
        })
        .state('createChart', {
          url: '/charts/new',
          templateUrl: 'views/chart-creation.html',
          controller: 'ChartCreationController',
          controllerAs: 'newChart',
          parent: 'root'
        })
        .state('chart', {
          url: '/charts/:id',
          templateUrl: 'views/chart.html',
          controller: 'ChartController',
          controllerAs: 'chart',
          parent: 'root'
        })
        .state('chartSettings', {
          url: '/charts/:id/settings',
          templateUrl: 'views/chart-settings.html',
          controller: 'ChartSettingsController',
          controllerAs: 'chart',
          parent: 'root'
        })
        .state('chartSets', {
          url: '/chart-sets',
          templateUrl: 'views/chart-sets.html',
          controller: 'ChartSetsController',
          controllerAs: 'chartsets',
          parent: 'root'
        })
        .state('createChartSet', {
          url: '/chart-sets/new',
          templateUrl: 'views/chart-set-creation.html',
          controller: 'ChartSetCreationController',
          controllerAs: 'chartset',
          parent: 'root'
        })
        .state('chartSet', {
          url: '/chart-sets/:id',
          templateUrl: 'views/chart-set.html',
          controller: 'ChartSetController',
          controllerAs: 'chartset',
          parent: 'root'
        })
        .state('chartSetSettings', {
          url: '/chart-sets/:id/settings',
          templateUrl: 'views/chart-set-settings.html',
          controller: 'ChartSetSettingsController',
          controllerAs: 'chartset',
          parent: 'root'
        })
        .state('develop', {
          url: '/develop',
          templateUrl: 'views/develop.html',
          controller: 'DevelopController',
          controllerAs: 'develop',
          parent: 'root'
        });

      // default router
      $urlRouterProvider.otherwise('/home');

      // line chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/linechart#configuration-options
      GoogleChartsServiceProvider.setLineChartDefaultOptions({});

      // column chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/columnchart#configuration-options
      GoogleChartsServiceProvider.setColumnChartDefaultOptions({});

      // bar chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/barchart#configuration-options
      GoogleChartsServiceProvider.setBarChartDefaultOptions({});

      // chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/combochart#configuration-options
      GoogleChartsServiceProvider.setComboChartDefaultOptions({});

      // chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/areachart#configuration-options
      GoogleChartsServiceProvider.setAreaChartDefaultOptions({});
    }
  ])

  // seperate by comma: ,
  .constant('FEEDBACK_EMAIL', 'pzhong@ra.rockwell.com');
