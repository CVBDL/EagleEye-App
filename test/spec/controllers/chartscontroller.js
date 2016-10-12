'use strict';

describe('Controller: ChartsController', function() {
  var rootEndpoint = 'http://127.0.0.1:3000/',
    chartsEndpoint = 'http://127.0.0.1:3000/api/v1/charts',
    deleteChartEndpoint = 'http://127.0.0.1:3000/api/v1/charts/id',
    chartList = [];

  var $controller,
    $location,
    $q,
    $rootScope,
    $state,
    $templateCache,
    $httpBackend,
    EagleEyeWebService,
    eeDeleteConfirmationService;

  var ChartsController,
    loadChartListHandler;

  // load main module
  beforeEach(module('eagleeye'));

  // mock dependent services
  beforeEach(module(function($provide) {

    // mock data in db
    chartList = [{
      "_id": "57ee0e635d2722401b951c35",
      "description": "",
      "domainDataType": "string",
      "options": {
        "title": "Image",
        "hAxis": {},
        "vAxis": {},
        "combolines": "",
        "isStacked": false,
        "chartArea": {}
      },
      "chartType": "ImageChart",
      "datatable": {},
      "type": "ImageChart",
      "image_file_name": "IC_763393rs34HDxVFhQs1OF5fUIFDJxn.png",
      "browserDownloadUrl": {
        "excel": null
      },
      "createdAt": "2016-09-30T07:04:03.534Z",
      "updatedAt": "2016-09-30T07:04:23.430Z"
    }, {
      "_id": "57eb31215d2722401b951c32",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit,",
      "chartType": "LineChart",
      "domainDataType": "number",
      "options": {
        "title": "A very very cool pagination test case",
        "hAxis": {
          "title": "",
          "format": ""
        },
        "vAxis": {
          "title": "",
          "format": ""
        },
        "combolines": "",
        "isStacked": false,
        "chartArea": {
          "left": "",
          "width": ""
        }
      },
      "datatable": {},
      "type": "chart",
      "browserDownloadUrl": {
        "excel": "http://127.0.0.1:3000/api/v1/download/excels/57eb31215d2722401b951c32"
      },
      "createdAt": "2016-09-28T02:55:29.789Z",
      "updatedAt": "2016-09-28T02:55:29.789Z"
    }];

    // mock EagleEyeWebService service
    $provide.factory('EagleEyeWebService', function($q) {
      var getCharts = jasmine.createSpy('getCharts').and.callFake(function() {
        return $q.when(chartList);
      });

      var deleteChartById = jasmine.createSpy('deleteChartById').and.callFake(function(id) {
        var len = chartList.length;

        while (len--) {
          if (chartList[len]._id === id) {
            chartList.splice(len, 1);
            break;
          }
        }

        return $q.when(true);
      });

      return {
        getCharts: getCharts,
        deleteChartById: deleteChartById
      }
    });

    // mock eeDeleteConfirmationService service
    $provide.factory('eeDeleteConfirmationService', function($q) {
      var deferred;
      var showDeleteConfirmationDialog = jasmine.createSpy('showDeleteConfirmationDialog').and.callFake(function(config) {
        deferred = $q.defer();

        return deferred.promise;
      });
      var resolve = function(value) {
        deferred.resolve(value);
      };
      var reject = function(reason) {
        deferred.reject(reason);
      };

      return {
        showDeleteConfirmationDialog: showDeleteConfirmationDialog,
        resolve: resolve,
        reject: reject
      };
    });
  }));

  // reset router
  beforeEach(module(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise( function(){ return false; });
  }));

  // inject services
  beforeEach(inject(function(_$controller_, _$location_, _$q_, _$rootScope_, _$state_, _$templateCache_, _$httpBackend_, _EagleEyeWebService_, _eeDeleteConfirmationService_) {
    $controller = _$controller_;
    $location = _$location_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    $templateCache = _$templateCache_;
    $httpBackend = _$httpBackend_;
    EagleEyeWebService = _EagleEyeWebService_;
    eeDeleteConfirmationService = _eeDeleteConfirmationService_;
  }));

  // mock data
  beforeEach(inject(function() {
    $templateCache.put('views/chart-creation.html', '');
  }));

  beforeEach(inject(function() {
    ChartsController = $controller('ChartsController', {
      $scope: $rootScope.$new(),
      EagleEyeWebService: EagleEyeWebService,
      eeDeleteConfirmationService: eeDeleteConfirmationService
    });
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should initialize correctly', function() {
    expect(ChartsController).toBeDefined();
    expect(ChartsController.isLoading).toBe(true);
    expect(ChartsController.chartList).toBeUndefined();
    expect(EagleEyeWebService.getCharts).toHaveBeenCalled();

    // resolve promise
    $rootScope.$digest();

    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual(chartList);
  });

  it('should load charts correctly when calls loadChartList()', function() {
    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual(chartList);

    // change mock data
    chartList = [];
    ChartsController.loadChartList();
    expect(EagleEyeWebService.getCharts).toHaveBeenCalled();
    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual([]);
  });

  it('should show confirmation popup and delete', function() {
    var $event = { stopPropagation: function() {} };
    var id, title;

    spyOn($event, 'stopPropagation');

    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual(chartList);

    // delete one
    id = chartList[0]._id;
    title = chartList[0].title;
    ChartsController.showConfirm($event, id, title);
    expect($event.stopPropagation).toHaveBeenCalled();
    expect(eeDeleteConfirmationService.showDeleteConfirmationDialog).toHaveBeenCalledWith({ title: title });
    eeDeleteConfirmationService.resolve('delete');
    $rootScope.$digest();
    expect(EagleEyeWebService.deleteChartById).toHaveBeenCalledWith(id);
    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList.length).toBe(1);
    expect(ChartsController.chartList).toEqual(chartList);

    // delete another
    id = chartList[0]._id;
    title = chartList[0].title;
    ChartsController.showConfirm($event, id, title);
    expect($event.stopPropagation).toHaveBeenCalled();
    expect(eeDeleteConfirmationService.showDeleteConfirmationDialog).toHaveBeenCalledWith({ title: title });
    eeDeleteConfirmationService.resolve('delete');
    $rootScope.$digest();
    expect(EagleEyeWebService.deleteChartById).toHaveBeenCalledWith(id);
    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList.length).toBe(0);
    expect(ChartsController.chartList).toEqual([]);
  });

  it('should show confirmation popup and cancel', function() {
    var $event = { stopPropagation: function() {} };
    var id, title;

    spyOn($event, 'stopPropagation');

    $rootScope.$digest();
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual(chartList);

    id = chartList[0]._id;
    title = chartList[0].title;
    ChartsController.showConfirm($event, id, title);
    expect($event.stopPropagation).toHaveBeenCalled();
    expect(eeDeleteConfirmationService.showDeleteConfirmationDialog).toHaveBeenCalledWith({ title: title });

    eeDeleteConfirmationService.resolve('cancel');
    $rootScope.$digest();
    expect(EagleEyeWebService.deleteChartById).toHaveBeenCalledTimes(0)
    expect(ChartsController.isLoading).toBe(false);
    expect(ChartsController.chartList).toEqual(chartList);
  });

  it('should go to chartCreation state', function() {
    $rootScope.$digest();
    ChartsController.createChart();
    $rootScope.$digest();
    expect($state.current.name).toBe('chartCreation');
    expect($location.url()).toBe('/charts/new');
  });

});
