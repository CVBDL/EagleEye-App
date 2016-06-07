'use strict';

/**
 * @ngdoc overview
 * @name eagleEyeApp
 * @description
 * # eagleEyeApp
 *
 * Main module of the application.
 */
angular
  .module('eagleEyeApp', [
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .state('about', {
        url: '/about',
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      });
    $urlRouterProvider
      .otherwise('/');
  });
