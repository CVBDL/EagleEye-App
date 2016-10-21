'use strict';

describe('Controller: ChartCreationController', function() {
  var $controller,
    $httpBackend,
    $mdDialog,
    $rootScope,
    $state,
    $templateCache,
    GoogleChartsService,
    EagleEyeWebService;

  var ChartCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.factory('GoogleChartsService', function() {
      var chartTypeOptions = [{
        label: 'Line Chart',
        value: 'LineChart'
      }, {
        label: 'Column Chart',
        value: 'ColumnChart'
      }, {
        label: 'Bar Chart',
        value: 'BarChart'
      }, {
        label: 'Combo Chart',
        value: 'ComboChart'
      }, {
        label: 'Area Chart',
        value: 'AreaChart'
      }, {
        label: 'Image Chart',
        value: 'ImageChart'
      }];
      var isStackedOptions = [{
        value: true,
        label: 'Yes'
      }, {
        value: false,
        label: 'No'
      }];

      var formatStringOptions = [{
        value: 'percent',
        label: 'Yes'
      }, {
        value: '',
        label: 'No'
      }];

      var getChartTypeOptions = jasmine.createSpy('getChartTypeOptions').and.callFake(function() {
        return chartTypeOptions;
      });
      var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function(chartType, axisDataType) {
        // body
      });
      var getIsStackedOptions = jasmine.createSpy('getIsStackedOptions').and.callFake(function() {
        return isStackedOptions;
      });
      var getFormatStringOptions = jasmine.createSpy('getFormatStringOptions').and.callFake(function() {
        return formatStringOptions;
      });

      return {
        getChartTypeOptions: getChartTypeOptions,
        getChartDataTableSamples: getChartDataTableSamples,
        getIsStackedOptions: getIsStackedOptions,
        getFormatStringOptions: getFormatStringOptions
      };
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() {
      return false;
    });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$mdDialog_, _$rootScope_, _$state_, _$templateCache_, _EagleEyeWebService_, _GoogleChartsService_) {
    $controller = _$controller_;
    $mdDialog = _$mdDialog_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $templateCache = _$templateCache_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
  }));

  beforeEach(inject(function($controller, $rootScope) {
    ChartCreationController = $controller('ChartCreationController', {
      $state: $state,
      $mdDialog: $mdDialog,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize controller correctly', function() {
    expect(ChartCreationController).toBeDefined();
  });

  it('should initialize chart type options correctly', function() {
    expect(GoogleChartsService.getChartTypeOptions).toHaveBeenCalled();
    expect(ChartCreationController.chartTypeOptions).toBe(GoogleChartsService.getChartTypeOptions());
  });

  it('should initialize data models correctly', function() {
    expect(ChartCreationController.isStackedOptions).toEqual([{
      value: true,
      label: 'Yes'
    }, {
      value: false,
      label: 'No'
    }]);
    expect(ChartCreationController.formatStringOptions).toEqual([{
      value: 'percent',
      label: 'Yes'
    }, {
      value: '',
      label: 'No'
    }]);
    expect(ChartCreationController.chart).toEqual({
      chartType: 'ColumnChart',
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
        isStacked: false,
        chartArea: {
          left: '',
          width: ''
        }
      }
    });
  });

});
