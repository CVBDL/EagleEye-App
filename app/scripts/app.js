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
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider, EagleEyeWebServiceProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
      .state('charts', {
        url: '/charts',
        templateUrl: 'views/charts.html',
        controller: 'ChartsController',
        controllerAs: 'charts'
      })
      .state('createChart', {
        url: '/charts/new',
        templateUrl: 'views/chart-creation.html',
        controller: 'ChartCreationController',
        controllerAs: 'newChart'
      })
      .state('chart', {
        url: '/charts/:id',
        templateUrl: 'views/chart.html',
        controller: 'ChartController',
        controllerAs: 'chart'
      })
      .state('chartSettings', {
        url: '/charts/:id/settings',
        templateUrl: 'views/chart-settings.html',
        controller: 'ChartSettingsController',
        controllerAs: 'chart'
      })
      .state('chartSets', {
        url: '/chart-sets',
        templateUrl: 'views/chart-sets.html',
        controller: 'ChartSetsController',
        controllerAs: 'chartsets'
      })
      .state('chartSet', {
        url: '/chart-set',
        templateUrl: 'views/chart-set.html',
        controller: 'ChartSetController',
        controllerAs: 'chartset'
      })
      .state('createChartSet', {
        url: '/chart-sets/new',
        templateUrl: 'views/chart-set-creation.html',
        controller: 'ChartSetCreationController',
        controllerAs: 'chartset'
      })
      .state('chartSetSettings', {
        url: '/chart-sets/:id/settings',
        templateUrl: 'views/chart-set-settings.html',
        controller: 'ChartSetSettingsController',
        controllerAs: 'chartset'
      });

    $urlRouterProvider.otherwise('/dashboard');

    EagleEyeWebServiceProvider.setWebServiceBaseUrl('http://localhost:3000/api/v1/');
  });
