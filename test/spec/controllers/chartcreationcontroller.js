'use strict';

describe('Controller: ChartCreationController', function() {
  var $controller,
    $httpBackend,
    $rootScope,
    $state,
    $templateCache,
    GoogleChartsService,
    EagleEyeWebService,
    eeHelpDialogService,
    CHART_TYPE_OPTIONS,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS;

  var ChartCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.factory('GoogleChartsService', function() {
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

      var getChartDataTableSamples = jasmine.createSpy('getChartDataTableSamples').and.callFake(function(chartType, axisDataType) {
        // body
      });
      var getIsStackedOptions = jasmine.createSpy('getIsStackedOptions').and.callFake(function() {
        return isStackedOptions;
      });
      var getFormatStringOptions = jasmine.createSpy('getFormatStringOptions').and.callFake(function() {
        return formatStringOptions;
      });
      var makeFriendlyUrl = jasmine.createSpy('makeFriendlyUrl').and.callFake(function(type, url) {
        return '';
      });
      var makeChartArea = jasmine.createSpy('makeChartArea').and.callFake(function(left, width) {
        return {};
      });

      return {
        getChartDataTableSamples: getChartDataTableSamples,
        getIsStackedOptions: getIsStackedOptions,
        getFormatStringOptions: getFormatStringOptions,
        makeFriendlyUrl: makeFriendlyUrl,
        makeChartArea: makeChartArea
      };
    });

    $provide.factory('EagleEyeWebService', function($q) {
      var deferred = $q.defer();
      var createChart = jasmine.createSpy('createChart').and.callFake(function(payload) {
        deferred = $q.defer();

        return deferred.promise;
      });

      return {
        createChart: createChart,
        resolve: function(value) {
          deferred.resolve(value);
        },
        reject: function() {
          deferred.reject('Rejected.');
        }
      };
    });

    $provide.factory('eeHelpDialogService', function() {
      return {
        showHelp: jasmine.createSpy('showHelp')
      };
    });

    $provide.constant('CHART_TYPE_OPTIONS', {});
    $provide.constant('IS_STACKED_OPTIONS', {});
    $provide.constant('AXIS_FORMAT_OPTIONS', {});
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() {
      return false;
    });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _$templateCache_, _EagleEyeWebService_, _GoogleChartsService_, _eeHelpDialogService_, _CHART_TYPE_OPTIONS_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $templateCache = _$templateCache_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    GoogleChartsService = _GoogleChartsService_;
    eeHelpDialogService = _eeHelpDialogService_;
    CHART_TYPE_OPTIONS = _CHART_TYPE_OPTIONS_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
  }));

  beforeEach(inject(function($controller, $rootScope) {
    ChartCreationController = $controller('ChartCreationController', {
      $state: $state,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      eeHelpDialogService: eeHelpDialogService,
      CHART_TYPE_OPTIONS: CHART_TYPE_OPTIONS,
      IS_STACKED_OPTIONS: IS_STACKED_OPTIONS,
      AXIS_FORMAT_OPTIONS: AXIS_FORMAT_OPTIONS
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartCreationController).toBeDefined();
  });

  it('should initialize chart type options', function() {
    expect(ChartCreationController.chartTypeOptions).toEqual({});
  });

  it('should initialize isStacked options', function() {
    expect(ChartCreationController.isStackedOptions).toEqual({});
  });

  it('should initialize format options', function() {
    expect(ChartCreationController.formatStringOptions).toEqual({});
  });

  it('should initialize chart model object', function() {
    expect(angular.isObject(ChartCreationController.chart)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.hAxis)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.vAxis)).toBe(true);
    expect(angular.isObject(ChartCreationController.chart.options.chartArea)).toBe(true);
  });

  it('should set default chart type to column chart', function() {
    expect(ChartCreationController.chart.domainDataType).toBe('string');
  });

  it('should set default domain data type to string', function() {
    expect(ChartCreationController.chart.domainDataType).toBe('string');
  });

  it('should initialize chart data model', function() {
    var chart = {
      chartType: 'ColumnChart',
      domainDataType: 'string',
      description: '',
      friendlyUrl: '',
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
    };

    expect(ChartCreationController.chart).toEqual(chart);
  });

  it('should be able to show help dialog', function() {
    ChartCreationController.showHelp();
    expect(eeHelpDialogService.showHelp).toHaveBeenCalled();
  });

  it('makeChartPayload() should make chart JSON', function() {
    var payload;
    var chart = {
      chartType: 'ColumnChart',
      domainDataType: 'string',
      description: 'Description',
      friendlyUrl: 'friendly-url',
      options: {
        title: 'The title',
        hAxis: {
          title: 'H title',
          format: 'percent'
        },
        vAxis: {
          title: 'V title',
          format: 'percent'
        },
        combolines: '2',
        isStacked: false,
        chartArea: {
          left: '10%',
          width: '90%'
        }
      }
    };

    expect(function() {
      payload = ChartCreationController.makeChartPayload(chart);
    }).not.toThrow();

    expect(payload.chartType).toBe(chart.chartType);
    expect(payload.domainDataType).toBe(chart.domainDataType);
    expect(payload.description).toBe(chart.description);
    expect(payload.options.title).toBe(chart.options.title);
    expect(payload.options.hAxis.title).toBe(chart.options.hAxis.title);
    expect(payload.options.hAxis.format).toBe(chart.options.hAxis.format);
    expect(payload.options.vAxis.title).toBe(chart.options.vAxis.title);
    expect(payload.options.vAxis.format).toBe(chart.options.vAxis.format);
    expect(payload.options.combolines).toBe(chart.options.combolines);
    expect(payload.options.isStacked).toBe(chart.options.isStacked);

    expect(GoogleChartsService.makeFriendlyUrl).toHaveBeenCalledWith('chart', chart.friendlyUrl);
    expect(GoogleChartsService.getChartDataTableSamples).toHaveBeenCalledWith(chart.chartType, chart.domainDataType);
    expect(GoogleChartsService.makeChartArea).toHaveBeenCalledWith(chart.options.chartArea.left, chart.options.chartArea.width);
  });

  describe('save()', function() {
    it('should call save method successfully', function() {
      spyOn(ChartCreationController, 'makeChartPayload').and.returnValue({});

      var payload;
      var chart = {
        chartType: 'ColumnChart',
        domainDataType: 'string',
        options: {}
      };

      ChartCreationController.save(chart);

      expect(ChartCreationController.makeChartPayload).toHaveBeenCalledWith(chart);
      expect(EagleEyeWebService.createChart).toHaveBeenCalledWith({});
    });

    it('should go to chart settings page when save successfully', function() {
      spyOn(ChartCreationController, 'makeChartPayload').and.returnValue({});
      spyOn($state, 'go');

      ChartCreationController.save({});
      EagleEyeWebService.resolve({ _id: 'fakeId' });
      $rootScope.$digest();

      expect($state.go).toHaveBeenCalledWith('chartSettings', { id: 'fakeId' });
    });
  });

});
