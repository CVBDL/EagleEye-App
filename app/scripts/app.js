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
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('root', {
          url: '',
          abstract: true,
          template: '<ui-view></ui-view>'
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('charts', {
          url: '/charts',
          templateUrl: 'views/charts.html',
          controller: 'ChartsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartCreation', {
          url: '/charts/new',
          templateUrl: 'views/chart-creation.html',
          controller: 'ChartCreationController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chart', {
          url: '/charts/:id',
          templateUrl: 'views/chart.html',
          controller: 'ChartController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartSettings', {
          url: '/charts/:id/settings',
          templateUrl: 'views/chart-settings.html',
          controller: 'ChartSettingsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartOptions', {
          url: '/charts/:id/options',
          templateUrl: 'views/chart-options.html',
          controller: 'ChartOptionsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartOptionsAdvance', {
          url: '/charts/:id/options-advance',
          templateUrl: 'views/chart-options-advance.html',
          controller: 'ChartOptionsAdvanceController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartSets', {
          url: '/chart-sets',
          templateUrl: 'views/chart-sets.html',
          controller: 'ChartSetsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartSetCreation', {
          url: '/chart-sets/new',
          templateUrl: 'views/chart-set-creation.html',
          controller: 'ChartSetCreationController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartSet', {
          url: '/chart-sets/:id',
          templateUrl: 'views/chart-set.html',
          controller: 'ChartSetController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('chartSetSettings', {
          url: '/chart-sets/:id/settings',
          templateUrl: 'views/chart-set-settings.html',
          controller: 'ChartSetSettingsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('jobs', {
          url: '/jobs',
          templateUrl: 'views/jobs.html',
          controller: 'JobsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('jobCreation', {
          url: '/jobs/new',
          templateUrl: 'views/job-details.html',
          controller: 'JobDetailsController',
          controllerAs: 'ctrl',
          parent: 'root'
        })
        .state('develop', {
          url: '/develop',
          templateUrl: 'views/develop.html',
          parent: 'root'
        });

      // default router
      $urlRouterProvider.otherwise('/home');

    }
  ])

  // seperate by comma: ,
  .constant('FEEDBACK_EMAIL', 'pzhong@ra.rockwell.com');
