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
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
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
        controllerAs: 'chart'
      })
      .state('singleChart', {
        url: '/charts/:id',
        templateUrl: 'views/chart.html',
        controller: 'ChartController',
        controllerAs: 'chart'
      });

    $urlRouterProvider.otherwise('/');
  });
