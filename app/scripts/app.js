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
    'EagleEyeWebServiceProvider',
    'GoogleChartsServiceProvider',
    function($stateProvider, $urlRouterProvider, EagleEyeWebServiceProvider, GoogleChartsServiceProvider) {
      $stateProvider
        .state('app', {
          url: '',
          abstract: true,
          controller: 'AppController'
        })
        .state('home', {
          url: '/home',
          templateUrl: 'views/home.html',
          controller: 'HomeController',
          controllerAs: 'home'
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
        .state('createChartSet', {
          url: '/chart-sets/new',
          templateUrl: 'views/chart-set-creation.html',
          controller: 'ChartSetCreationController',
          controllerAs: 'chartset'
        })
        .state('chartSet', {
          url: '/chart-sets/:id',
          templateUrl: 'views/chart-set.html',
          controller: 'ChartSetController',
          controllerAs: 'chartset'
        })
        .state('chartSetSettings', {
          url: '/chart-sets/:id/settings',
          templateUrl: 'views/chart-set-settings.html',
          controller: 'ChartSetSettingsController',
          controllerAs: 'chartset'
        });

      // default router
      $urlRouterProvider.otherwise('/home');

      EagleEyeWebServiceProvider.setWebServiceBaseUrl('http://localhost:3000/api/v1/');

      // line chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/linechart#configuration-options
      GoogleChartsServiceProvider.setLineChartDefaultOptions({
        animation: {
          startup: true,
          duration: 500,
          easing: 'linear'
        },
        backgroundColor: {
          stroke: 'white',
          strokeWidth: 0,
          fill: 'white'
        },
        chartArea: null,
        crosshair: null,
        curveType: 'function',
        fontName: "Roboto, 'Helvetica Neue', sans-serif",
        legend: {
          position: 'top',
          alignment: 'end',
          maxLines: 2,
          textStyle: {
            color: '#555555',  // $color-gray-dark
          }
        },
        lineWidth: 2,
        pointShape: 'circle',
        titlePosition: 'none',
        tooltip: {
          ignoreBounds: false,
          isHtml: false,
          textStyle: {
            color: '#555555',  // $color-gray-dark
            fontName: "Roboto, 'Helvetica Neue', sans-serif",
            fontSize: 14,
            bold: false,
            italic: false
          }
        }
      });

    }
  ]);
