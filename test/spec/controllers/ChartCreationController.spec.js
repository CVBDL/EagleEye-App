'use strict';

describe('Controller: ChartCreationController', function() {
  var $controller,
    $http,
    $httpBackend,
    $q,
    $rootScope,
    $state,
    GoogleChartsService,
    EagleEyeWebService,
    EagleEyeWebServiceUtil,
    EEDialogService,
    CHART_TYPE_OPTIONS,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS,
    DATA_TABLE_SAMPLES;

  var ChartCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // load EEDialogService mock module
  beforeEach(module('EEDialogServiceMock'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$http_, _$httpBackend_, _$q_, _$rootScope_, _$state_, _EagleEyeWebService_, _EagleEyeWebServiceUtil_, _GoogleChartsService_, _EEDialogService_, _CHART_TYPE_OPTIONS_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_, _DATA_TABLE_SAMPLES_) {
    $controller = _$controller_;
    $http = _$http_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    EagleEyeWebService = _EagleEyeWebService_;
    EagleEyeWebServiceUtil = _EagleEyeWebServiceUtil_;
    GoogleChartsService = _GoogleChartsService_;
    EEDialogService = _EEDialogService_;
    CHART_TYPE_OPTIONS = _CHART_TYPE_OPTIONS_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
    DATA_TABLE_SAMPLES = _DATA_TABLE_SAMPLES_;
  }));

  beforeEach(inject(function() {
    ChartCreationController = $controller('ChartCreationController', {
      $state: $state,
      GoogleChartsService: GoogleChartsService,
      EagleEyeWebService: EagleEyeWebService,
      EEDialogService: EEDialogService,
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

  describe('on initialize', function() {

    it('should initialize `chartTypeOptions` model', function() {
      expect(ChartCreationController.chartTypeOptions).toBe(CHART_TYPE_OPTIONS);
    });

    it('should initialize `isStackedOptions` model', function() {
      expect(ChartCreationController.isStackedOptions).toBe(IS_STACKED_OPTIONS);
    });

    it('should initialize `axisFormatOptions` model', function() {
      expect(ChartCreationController.axisFormatOptions).toBe(AXIS_FORMAT_OPTIONS);
    });

    it('should initialize `chart` model', function() {
      expect(angular.isObject(ChartCreationController.chart)).toBe(true);
      expect(ChartCreationController.chart.chartType).toBeDefined();
      expect(ChartCreationController.chart.domainDataType).toBeDefined();
      expect(ChartCreationController.chart.description).toBeDefined();
      expect(ChartCreationController.chart.friendlyUrl).toBeDefined();
      expect(angular.isObject(ChartCreationController.chart.options)).toBe(true);
      expect(ChartCreationController.chart.options.title).toBeDefined();
      expect(ChartCreationController.chart.options.combolines).toBeDefined();
      expect(ChartCreationController.chart.options.isStacked).toBeDefined();
      expect(angular.isObject(ChartCreationController.chart.options.hAxis)).toBe(true);
      expect(ChartCreationController.chart.options.hAxis.title).toBeDefined();
      expect(ChartCreationController.chart.options.hAxis.format).toBeDefined();
      expect(angular.isObject(ChartCreationController.chart.options.vAxis)).toBe(true);
      expect(ChartCreationController.chart.options.vAxis.title).toBeDefined();
      expect(ChartCreationController.chart.options.vAxis.format).toBeDefined();
      expect(angular.isObject(ChartCreationController.chart.options.chartArea)).toBe(true);
      expect(ChartCreationController.chart.options.chartArea.left).toBeDefined();
      expect(ChartCreationController.chart.options.chartArea.width).toBeDefined();
    });

    it('should set default chart type to "ColumnChart"', function() {
      expect(ChartCreationController.chart.chartType).toBe('ColumnChart');
    });

    it('should set default domain data type to "string"', function() {
      expect(ChartCreationController.chart.domainDataType).toBe('string');
    });

    it('should set default axis format to ""', function() {
      expect(ChartCreationController.chart.options.hAxis.format).toBe('');
      expect(ChartCreationController.chart.options.vAxis.format).toBe('');
    });
  });

  describe('on runtime', function() {

    describe('showHelp()', function() {
      it('should use EEDialogService to show help dialog', function() {
        ChartCreationController.showHelp();

        expect(EEDialogService.showChartCreationHelping).toHaveBeenCalled();
      });
    });

    describe('makeChartPayload()', function() {
      var chartA,
        chartB,
        payloadA,
        payloadB;

      beforeEach(function() {
        chartA = {
          chartType: 'LineChart',
          description: 'foo',
          domainDataType: 'string',
          friendlyUrl: 'friendly-url',
          options: {
            title: 'title',
            hAxis: {
              title: 'title',
              format: ''
            },
            vAxis: {
              title: '',
              format: 'percent'
            },
            chartArea: {
              left: '20%',
              width: '50%'
            }
          }
        };

        payloadA = ChartCreationController.makeChartPayload(chartA);

        chartB = {
          chartType: 'BarChart',
          description: '',
          domainDataType: 'date',
          friendlyUrl: '',
          options: {
            isStacked: false
          }
        };

        payloadB = ChartCreationController.makeChartPayload(chartB);
      });

      it('should return an object of generated payload', function() {
        expect(typeof payloadA).toBe('object');
        expect(payloadA).not.toBeNull();
        expect(typeof payloadB).toBe('object');
        expect(payloadB).not.toBeNull();
      });

      it('should contain generated `description` in returned payload', function() {
        expect(payloadA.description).toBe('foo');
        expect(payloadB.description).toBe('');
      });

      it('should contain generated `chartType` in returned payload', function() {
        expect(payloadA.chartType).toBe('LineChart');
        expect(payloadB.chartType).toBe('BarChart');
      });

      it('should contain generated `friendlyUrl` in returned payload', function() {
        expect(payloadA.friendlyUrl).toBe('c-friendly-url');
        expect(payloadB.friendlyUrl).toBe('');
      });

      it('should contain generated `domainDataType` in returned payload', function() {
        expect(payloadA.domainDataType).toBe('string');
        expect(payloadB.domainDataType).toBe('date');
      });

      it('should make datatable payload', function() {
        expect(payloadA.datatable).toBe(DATA_TABLE_SAMPLES.linechart.string);
        expect(payloadB.datatable).toBe(DATA_TABLE_SAMPLES.barchart.date);
      });

      it('should make options payload', function() {
        expect(payloadA.options).toEqual({
          title: 'title',
          hAxis: {
            title: 'title'
          },
          vAxis: {
            format: 'percent'
          },
          chartArea: {
            left: '20%',
            width: '50%'
          }
        });
        expect(payloadB.options).toEqual({
          title: '',
          hAxis: {},
          vAxis: {},
          chartArea: {},
          isStacked: false
        });
      });
    });

    describe('save()', function() {
      var createChartEndpoint = '/api/v1/charts';

      beforeEach(function() {
        $httpBackend.when('POST', '/api/v1/charts').respond({ _id: 'id' });

        spyOn(ChartCreationController, 'makeChartPayload').and.returnValue({});
        spyOn($state, 'go');
      });

      it('should call `makeChartPayload()` to prepare payload', function() {
        var chart = {};

        ChartCreationController.save(chart);

        expect(ChartCreationController.makeChartPayload).toHaveBeenCalledWith(chart);
        $httpBackend.flush();
      });

      it('should make a POST request to server for creating chart', function() {
        var chart = {};

        ChartCreationController.save(chart);

        $httpBackend.expectPOST(createChartEndpoint, {});
        $httpBackend.flush();
      });

      it('should POST the chart payload to server', function() {
        var chart = { foo: 'foo' };

        ChartCreationController.makeChartPayload.and.returnValue(chart);

        ChartCreationController.save(chart);

        $httpBackend.expectPOST(createChartEndpoint, chart);
        $httpBackend.flush();
      });

      it('should navigate to chart setting page after creating successfully', function() {
        ChartCreationController.save({});
        $httpBackend.flush();
        $rootScope.$digest();

        expect($state.go).toHaveBeenCalledWith('chartSettings', { id: 'id' });
      });
    });
  });
});