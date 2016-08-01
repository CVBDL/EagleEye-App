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
          url: '/charts/:id/settings/:type',
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
          url: '/chart-sets/:id/settings/',
          templateUrl: 'views/chart-set-settings.html',
          controller: 'ChartSetSettingsController',
          controllerAs: 'chartset'
        })
        .state('develop', {
          url: '/develop',
          templateUrl: 'views/develop.html',
          controller: 'DevelopController',
          controllerAs: 'develop'
        });

      // default router
      $urlRouterProvider.otherwise('/home');

      // set eagleeye restful web service root endpoint
      EagleEyeWebServiceProvider.setWebServiceBaseUrl('http://localhost:3000/api/v1/');

      // set eagleeye image & excel file uploading service endpoint
      EagleEyeWebServiceProvider.setFileUploadServiceBaseUrl('http://localhost:3000/chartFile/');

      // set eagleeye excel template downloading base url
      EagleEyeWebServiceProvider.setExcelTemplateDownloadBaseUrl('http://localhost:3000/chartFile/downloadExcel/');

      // set eagleeye server side static image files base url
      EagleEyeWebServiceProvider.setStaticServerSideImageBaseUrl('http://localhost:3000/uploadChartImages/');

      // line chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/linechart#configuration-options
      GoogleChartsServiceProvider.setLineChartDefaultOptions({
        animation: {
          startup: true,
          duration: 500,
          easing: 'out'
        },
        backgroundColor: {
          stroke: 'white',
          strokeWidth: 0,
          fill: 'white'
        },
        chartArea: {
          width: '85%'
        },
        crosshair: {
          color: '#80D8FF',
          orientation: 'vertical',
          trigger: 'both'
        },
        curveType: 'function',
        // fontName: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        legend: {
          position: 'top',
          alignment: 'end',
          maxLines: 2,
          textStyle: {
            color: '#555555', // $color-gray-dark
          }
        },
        lineWidth: 2,
        pointShape: 'circle',
        titlePosition: 'none',
        tooltip: {
          ignoreBounds: false,
          isHtml: false,
          showColorCode: true,
          textStyle: {
            color: '#555555', // $color-gray-dark
            // fontName: "Roboto, 'Helvetica Neue', sans-serif",
            fontSize: 14,
            bold: false,
            italic: false
          }
        }
      });

      // column chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/columnchart#configuration-options
      GoogleChartsServiceProvider.setColumnChartDefaultOptions({
        animation: {
          startup: true,
          duration: 500,
          easing: 'out'
        },
        backgroundColor: {
          stroke: 'white',
          strokeWidth: 0,
          fill: 'white'
        },
        bar: { groupWidth: "61.8%" },
        chartArea: {
          width: '85%'
        },
        // fontName: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        legend: {
          position: 'top',
          alignment: 'end',
          maxLines: 2,
          textStyle: {
            color: '#555555', // $color-gray-dark
          }
        },
        titlePosition: 'none',
        tooltip: {
          ignoreBounds: false,
          isHtml: false,
          showColorCode: true,
          textStyle: {
            color: '#555555', // $color-gray-dark
            // fontName: "Roboto, 'Helvetica Neue', sans-serif",
            fontSize: 14,
            bold: false,
            italic: false
          }
        }
      });

      // bar chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/barchart#configuration-options
      GoogleChartsServiceProvider.setBarChartDefaultOptions({
        animation: {
          startup: true,
          duration: 500,
          easing: 'out'
        },
        backgroundColor: {
          stroke: 'white',
          strokeWidth: 0,
          fill: 'white'
        },
        bar: { groupWidth: "61.8%" },
        chartArea: {
          width: '85%'
        },
        // fontName: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        legend: {
          position: 'top',
          alignment: 'end',
          maxLines: 2,
          textStyle: {
            color: '#555555', // $color-gray-dark
          }
        },
        titlePosition: 'none',
        tooltip: {
          ignoreBounds: false,
          isHtml: false,
          showColorCode: true,
          textStyle: {
            color: '#555555', // $color-gray-dark
            // fontName: "Roboto, 'Helvetica Neue', sans-serif",
            fontSize: 14,
            bold: false,
            italic: false
          }
        }
      });

      // chart default options
      // docs: https://developers.google.com/chart/interactive/docs/gallery/combochart#configuration-options
      GoogleChartsServiceProvider.setComboChartDefaultOptions({
        animation: {
          startup: true,
          duration: 500,
          easing: 'out'
        },
        backgroundColor: {
          stroke: 'white',
          strokeWidth: 0,
          fill: 'white'
        },
        bar: { groupWidth: "61.8%" },
        chartArea: {
          width: '85%'
        },
        // fontName: "Roboto, 'Helvetica Neue', sans-serif",
        fontSize: 14,
        legend: {
          position: 'top',
          alignment: 'end',
          maxLines: 2,
          textStyle: {
            color: '#555555', // $color-gray-dark
          }
        },
        titlePosition: 'none',
        tooltip: {
          ignoreBounds: false,
          isHtml: false,
          showColorCode: true,
          textStyle: {
            color: '#555555', // $color-gray-dark
            // fontName: "Roboto, 'Helvetica Neue', sans-serif",
            fontSize: 14,
            bold: false,
            italic: false
          }
        }
      });
    }
  ])

  // seperate by comma: ,
  .constant('FEEDBACK_EMAIL', 'pzhong@ra.rockwell.com');
