'use strict';

describe('Controller: ChartSetCreationController', function() {
  var $controller,
    $q,
    $rootScope,
    $state,
    $httpBackend,
    EagleEyeWebService,
    EagleEyeWebServiceUtil;

  var ChartSetCreationController,
    getChartsRequestHandler,
    createChartSetRequestHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _EagleEyeWebService_, _EagleEyeWebServiceUtil_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    EagleEyeWebServiceUtil = _EagleEyeWebServiceUtil_;
  }));

  beforeEach(function() {
    getChartsRequestHandler = $httpBackend.when('GET', '/api/v1/charts').respond([]);
    createChartSetRequestHandler = $httpBackend.when('POST', '/api/v1/chart-sets').respond({});
  });

  beforeEach(inject(function() {
    ChartSetCreationController = $controller('ChartSetCreationController', {
      $state: $state,
      EagleEyeWebService: EagleEyeWebService,
      EagleEyeWebServiceUtil: EagleEyeWebServiceUtil
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSetCreationController).toBeDefined();
    $httpBackend.flush();
  });

  describe('on initialize', function() {

    afterEach(function() {
      $httpBackend.flush();
    });

    it('should initialize `searchKeyword` model', function() {
      expect(ChartSetCreationController.searchKeyword).toBe('');
    });

    it('should initialize `chartset` model', function() {
      expect(ChartSetCreationController.chartset).toBeDefined();
      expect(typeof ChartSetCreationController.chartset).toBe('object');
      expect(ChartSetCreationController.chartset.title).toBe('');
      expect(ChartSetCreationController.chartset.description).toBe('');
      expect(ChartSetCreationController.chartset.friendlyUrl).toBe('');
      expect(ChartSetCreationController.chartset.charts).toEqual([]);
    });
  });

  describe('on bootstrap', function() {

    it('should make a GET request to fetch all charts', function() {
      $httpBackend.expect('GET', '/api/v1/charts');
      $httpBackend.flush();
    });

    it('should set `chartList` model when request success', function() {
      var chartList = [
        { _id: 1, foo: 'foo' },
        { _id: 2, bar: 'bar' }
      ];

      getChartsRequestHandler.respond(chartList)
      $httpBackend.flush();

      expect(ChartSetCreationController.chartList).toEqual(chartList);
    });

    it('should do nothing when request error', function() {
      var chartList = [];

      ChartSetCreationController.chartList = chartList;

      getChartsRequestHandler.respond(500);
      $httpBackend.flush();

      expect(ChartSetCreationController.chartList).toEqual(chartList);
    });
  });

  describe('on runtime', function() {

    beforeEach(function() {
      $httpBackend.flush();
    });

    describe('filterFunction()', function() {
      it('should return true if chart title contains the keyword.', function() {
        ChartSetCreationController.searchKeyword = 'foo';

        var result = ChartSetCreationController.filterFunction({
          description: '',
          options: { title: 'title contains foo' }
        });

        expect(result).toBe(true);
      });

      it('should return true if chart description contains the keyword.', function() {
        ChartSetCreationController.searchKeyword = 'foo';

        var result = ChartSetCreationController.filterFunction({
          description: 'description contains foo',
          options: { title: '' }
        });

        expect(result).toBe(true);
      });

      it('should return true if chart title and description contain the keyword.', function() {
        ChartSetCreationController.searchKeyword = 'foo';

        var result = ChartSetCreationController.filterFunction({
          description: 'description contains foo',
          options: { title: 'title contains foo' }
        });

        expect(result).toBe(true);
      });

      it('should return false if chart title and description not contain the keyword.', function() {
        ChartSetCreationController.searchKeyword = 'foo';

        var result = ChartSetCreationController.filterFunction({
          description: '',
          options: { title: '' }
        });

        expect(result).toBe(false);
      });
    });

    describe('onChartCheckedStatusChange', function() {
      var chart;

      beforeEach(function() {
        chart = { id: 1, checked: true };
        ChartSetCreationController.chartset.charts = [chart];
      });

      it('should add the chart to list the chart is checked', function() {
        var anotherChart = { id: 2, checked: true };

        ChartSetCreationController.onChartCheckedStatusChange(anotherChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([chart, anotherChart]);
      });

      it('should remove the chart from list the chart is unchecked', function() {
        chart.checked = false;
        ChartSetCreationController.onChartCheckedStatusChange(chart);
        expect(ChartSetCreationController.chartset.charts).toEqual([]);
      });

      it('should do nothing if the chart is not in list', function() {
        var anotherChart = { id: 2, checked: false };
        ChartSetCreationController.onChartCheckedStatusChange(anotherChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([chart]);
      });
    });

    describe('moveUp', function() {
      var firstChart,
        secondChart,
        thirdChart;

      beforeEach(function() {
        firstChart = { id: 1 };
        secondChart = { id: 2 };
        thirdChart = { id: 3 };
        ChartSetCreationController.chartset.charts = [firstChart, secondChart, thirdChart];
      });

      it('should not change order if the chart to move is already the first one', function() {
        ChartSetCreationController.moveUp(firstChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([firstChart, secondChart, thirdChart]);
      });

      it('should move up one level to be the first one', function() {
        ChartSetCreationController.moveUp(secondChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([secondChart, firstChart, thirdChart]);
      });

      it('should move up one level normally', function() {
        ChartSetCreationController.moveUp(thirdChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([firstChart, thirdChart, secondChart]);
      });
    });

    describe('moveDown', function() {
      var firstChart,
        secondChart,
        thirdChart;

      beforeEach(function() {
        firstChart = { id: 1 };
        secondChart = { id: 2 };
        thirdChart = { id: 3 };
        ChartSetCreationController.chartset.charts = [firstChart, secondChart, thirdChart];
      });

      it('should not change order if the chart to move is already the last one', function() {
        ChartSetCreationController.moveDown(thirdChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([firstChart, secondChart, thirdChart]);
      });

      it('should move down one level to be the last one', function() {
        ChartSetCreationController.moveDown(secondChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([firstChart, thirdChart, secondChart]);
      });

      it('should move down one level normally', function() {
        ChartSetCreationController.moveDown(firstChart);
        expect(ChartSetCreationController.chartset.charts).toEqual([secondChart, firstChart, thirdChart]);
      });
    });

    describe('makeChartsList', function() {
      it('should return empty array if given empty charts array', function() {
        expect(ChartSetCreationController.makeChartsList([])).toEqual([]);
      });

      it('should return array with chart _id property', function() {
        var charts = [{ _id: 'foo' }, { _id: 'bar' }];

        expect(ChartSetCreationController.makeChartsList(charts)).toEqual(['foo', 'bar']);
      });
    });

    describe('makeChartSetPayload', function() {
      beforeEach(function() {
        spyOn(ChartSetCreationController, 'makeChartsList').and.returnValue([]);
      });

      it('should return payload always contains title and description fields', function() {
        var payload;

        payload = ChartSetCreationController.makeChartSetPayload({});
        expect(payload.title).toBeDefined();
        expect(payload.description).toBeDefined();
        expect(payload.friendlyUrl).toBeDefined();
        expect(payload.charts).toBeDefined();
      });

      it('should call makeChartsList()', function() {
        ChartSetCreationController.makeChartSetPayload({ charts: [] });
        expect(ChartSetCreationController.makeChartsList).toHaveBeenCalledWith([]);
      });
    });

    describe('save()', function() {
      var payload = { foo: 'foo' };

      beforeEach(function() {
        spyOn(ChartSetCreationController, 'makeChartSetPayload').and.returnValue(payload);
        spyOn($state, 'go');
      });

      it('should prepare request payload by calling makeChartSetPayload()', function() {
        var chartset = {};

        ChartSetCreationController.save(chartset);
        expect(ChartSetCreationController.makeChartSetPayload).toHaveBeenCalledWith(chartset);
        $httpBackend.flush();
      });

      it('should make a POST request to create a chart set with generated payload', function() {
        var chartset = {};

        ChartSetCreationController.save(chartset);
        $httpBackend.expect('POST', '/api/v1/chart-sets', payload);
        $httpBackend.flush();
      });

      it('should navigate to chartSet state after creating chart set', function() {
        var chartset = { _id: '1' },
          updatedChartSet = { _id: '1', foo: 'foo' };

        ChartSetCreationController.save(chartset);
        createChartSetRequestHandler.respond(updatedChartSet);
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('chartSet', { id: '1' });
      });
    });

    describe('loadChartList()', function() {

      it('should make a GET request to fetch all charts', function() {
        ChartSetCreationController.loadChartList();

        $httpBackend.expect('GET', '/api/v1/charts');
        $httpBackend.flush();
      });

      it('should set `chartList` model when request success', function() {
        var chartList = [
          { _id: '1', foo: 'foo' },
          { _id: '2', bar: 'bar' }
        ];

        ChartSetCreationController.loadChartList();
        getChartsRequestHandler.respond(chartList);
        $httpBackend.flush();

        expect(ChartSetCreationController.chartList).toEqual(chartList);
      });

      it('should do nothing when request error', function() {
        ChartSetCreationController.chartList = [];

        ChartSetCreationController.loadChartList();
        getChartsRequestHandler.respond(500);
        $httpBackend.flush();

        expect(ChartSetCreationController.chartList).toEqual([]);
      });
    });
  });
});
