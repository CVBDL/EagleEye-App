'use strict';

/**
 * @ngdoc module
 * @name eagleeye
 * @description
 * The main module of EagleEye-App project.
 * All of the controllers, directives and services are exposed via this module.
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
    '$qProvider',
    function($stateProvider, $urlRouterProvider, $qProvider) {
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'ctrl'
        })
        .state('charts', {
          url: '/charts',
          templateUrl: 'views/charts.html',
          controller: 'ChartsController',
          controllerAs: 'ctrl'
        })
        .state('chartCreation', {
          url: '/charts/new',
          templateUrl: 'views/chart-creation.html',
          controller: 'ChartCreationController',
          controllerAs: 'ctrl'
        })
        .state('chart', {
          url: '/charts/:id',
          templateUrl: 'views/chart.html',
          controller: 'ChartController',
          controllerAs: 'ctrl'
        })
        .state('chartSettings', {
          url: '/charts/:id/settings',
          templateUrl: 'views/chart-settings.html',
          controller: 'ChartSettingsController',
          controllerAs: 'ctrl'
        })
        .state('chartOptions', {
          url: '/charts/:id/options',
          templateUrl: 'views/chart-options.html',
          controller: 'ChartOptionsController',
          controllerAs: 'ctrl'
        })
        .state('chartOptionsAdvance', {
          url: '/charts/:id/options-advance',
          templateUrl: 'views/chart-options-advance.html',
          controller: 'ChartOptionsAdvanceController',
          controllerAs: 'ctrl'
        })
        .state('chartSets', {
          url: '/chart-sets',
          templateUrl: 'views/chart-sets.html',
          controller: 'ChartSetsController',
          controllerAs: 'ctrl'
        })
        .state('chartSetCreation', {
          url: '/chart-sets/new',
          templateUrl: 'views/chart-set-creation.html',
          controller: 'ChartSetCreationController',
          controllerAs: 'ctrl'
        })
        .state('chartSet', {
          url: '/chart-sets/:id',
          templateUrl: 'views/chart-set.html',
          controller: 'ChartSetController',
          controllerAs: 'ctrl'
        })
        .state('chartSetSettings', {
          url: '/chart-sets/:id/settings',
          templateUrl: 'views/chart-set-settings.html',
          controller: 'ChartSetSettingsController',
          controllerAs: 'ctrl'
        })
        .state('develop', {
          url: '/develop',
          templateUrl: 'views/develop.html',
        });

      // default router
      $urlRouterProvider.otherwise('/home');

      $qProvider.errorOnUnhandledRejections(false);
    }
  ])

  // seperate by comma: ,
  .constant('FEEDBACK_EMAIL', 'pzhong@ra.rockwell.com');
