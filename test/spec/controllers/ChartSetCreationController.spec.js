'use strict';

describe('Controller: ChartSetCreationController', function() {
  var $controller,
    $q,
    $rootScope,
    $state,
    $httpBackend,
    EagleEyeWebService;

  var ChartSetCreationController;

  // load main module
  beforeEach(module('eagleeye'));

  // load EagleEyeWebService mock module
  beforeEach(module('EagleEyeWebServiceMock'));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_, _$state_, _EagleEyeWebService_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
  }));

  beforeEach(inject(function() {
    ChartSetCreationController = $controller('ChartSetCreationController', {
      $state: $state,
      EagleEyeWebService: EagleEyeWebService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create controller', function() {
    expect(ChartSetCreationController).toBeDefined();
  });

  it('should initialize search box data model', function() {
    expect(ChartSetCreationController.searchKeyword).toBeDefined();
  });

  it('should initialize chart set data model', function() {
    expect(ChartSetCreationController.chartset).toBeDefined();
    expect(typeof ChartSetCreationController.chartset).toBe('object');
    expect(ChartSetCreationController.chartset.title).toBe('');
    expect(ChartSetCreationController.chartset.description).toBe('');
    expect(ChartSetCreationController.chartset.friendlyUrl).toBe('');
    expect(ChartSetCreationController.chartset.charts).toEqual([]);
  });

  it('should call init() when create controller', function() {
    expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
  });

  describe('init()', function() {
    it('should call loadChartList() to fetch chart list', function() {
      ChartSetCreationController.init();
      expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
      expect(EagleEyeWebService.getCharts).toHaveBeenCalledTimes(2);
    });
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

    it('should call makeFriendlyUrl()', function() {
      ChartSetCreationController.makeChartSetPayload({ friendlyUrl: 'foo' });
      expect(EagleEyeWebService.makeFriendlyUrl).toHaveBeenCalledWith('chartset', 'foo');
    });

    it('should call makeChartsList()', function() {
      ChartSetCreationController.makeChartSetPayload({ charts: [] });
      expect(ChartSetCreationController.makeChartsList).toHaveBeenCalledWith([]);
    });
  });

  describe('save()', function() {
    beforeEach(function() {
      spyOn(ChartSetCreationController, 'makeChartSetPayload').and.callFake(function() {
        return { name: 'payload' };
      });

      spyOn($state, 'go');
    });

    it('should call makeChartSetPayload() to make payload', function() {
      ChartSetCreationController.save({});
      expect(ChartSetCreationController.makeChartSetPayload).toHaveBeenCalledWith({});
    });

    it('should call EagleEyeWebService with payload to create chart set', function() {
      ChartSetCreationController.save({});
      expect(EagleEyeWebService.createChartSet).toHaveBeenCalledWith({ name: 'payload' });
    });

    it('should to to chartSet state after creating chart set', function() {
      ChartSetCreationController.save({});
      EagleEyeWebService.resolveCreateCharSett({ _id: '_id' });
      $rootScope.$digest();
      expect($state.go).toHaveBeenCalledWith('chartSet', { id: '_id' });
    });
  });

  describe('loadChartList()', function() {
    it('should call EagleEyeWebService to fetch charts', function() {
      ChartSetCreationController.loadChartList();
      expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
    });

    it('should refresh charts in controller', function() {
      ChartSetCreationController.loadChartList();
      EagleEyeWebService.resolveGetCharts([{ id: 1 }]);
      $rootScope.$digest();
      expect(ChartSetCreationController.chartList).toEqual([{ id: 1 }]);
    });
  });
});
