'use strict';

describe('Constant:', function() {
  var CHART_TYPE_OPTIONS,
    IS_STACKED_OPTIONS,
    AXIS_FORMAT_OPTIONS,
    DEFAULT_CHART_OPTIONS,
    DATA_TABLE_SAMPLES;

  beforeEach(module('eagleeye'));

  beforeEach(inject(function(_CHART_TYPE_OPTIONS_, _IS_STACKED_OPTIONS_, _AXIS_FORMAT_OPTIONS_, _DEFAULT_CHART_OPTIONS_, _DATA_TABLE_SAMPLES_) {
    CHART_TYPE_OPTIONS = _CHART_TYPE_OPTIONS_;
    IS_STACKED_OPTIONS = _IS_STACKED_OPTIONS_;
    AXIS_FORMAT_OPTIONS = _AXIS_FORMAT_OPTIONS_;
    DEFAULT_CHART_OPTIONS = _DEFAULT_CHART_OPTIONS_;
    DATA_TABLE_SAMPLES = _DATA_TABLE_SAMPLES_;
  }));

  describe('CHART_TYPE_OPTIONS', function() {
    it('should be initialized', function() {
      expect(CHART_TYPE_OPTIONS).toEqual([{
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
        label: 'Pie Chart',
        value: 'PieChart'
      }, {
        label: 'Image Chart',
        value: 'ImageChart'
      }]);
    });
  });

  describe('IS_STACKED_OPTIONS', function() {
    it('should be initialized', function() {
      expect(IS_STACKED_OPTIONS).toEqual([{
        value: true,
        label: 'Yes'
      }, {
        value: false,
        label: 'No'
      }]);
    });
  });

  describe('AXIS_FORMAT_OPTIONS', function() {
    it('should be initialized', function() {
      expect(AXIS_FORMAT_OPTIONS).toEqual([{
        value: 'percent',
        label: 'Yes'
      }, {
        value: '',
        label: 'No'
      }]);
    });
  });

  describe('DEFAULT_CHART_OPTIONS', function() {
    it('should be initialized', function() {
      expect(DEFAULT_CHART_OPTIONS).toEqual({
        linechart: {
          animation: {
            startup: true,
            duration: 350,
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
          curveType: 'none',
          fontSize: 14,
          legend: {
            position: 'top',
            alignment: 'end',
            maxLines: 2,
            textStyle: {
              color: '#555555'
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
              color: '#555555',
              fontSize: 14,
              bold: false,
              italic: false
            }
          }
        },
        columnchart: {
          animation: {
            startup: true,
            duration: 350,
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
          fontSize: 14,
          legend: {
            position: 'top',
            alignment: 'end',
            maxLines: 2,
            textStyle: {
              color: '#555555'
            }
          },
          titlePosition: 'none',
          tooltip: {
            ignoreBounds: false,
            isHtml: false,
            showColorCode: true,
            textStyle: {
              color: '#555555',
              fontSize: 14,
              bold: false,
              italic: false
            }
          }
        },
        barchart: {
          animation: {
            startup: true,
            duration: 350,
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
          curveType: 'none',
          fontSize: 14,
          legend: {
            position: 'top',
            alignment: 'end',
            maxLines: 2,
            textStyle: {
              color: '#555555'
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
              color: '#555555',
              fontSize: 14,
              bold: false,
              italic: false
            }
          }
        },
        combochart: {
          animation: {
            startup: true,
            duration: 350,
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
          fontSize: 14,
          legend: {
            position: 'top',
            alignment: 'end',
            maxLines: 2,
            textStyle: {
              color: '#555555'
            }
          },
          titlePosition: 'none',
          tooltip: {
            ignoreBounds: false,
            isHtml: false,
            showColorCode: true,
            textStyle: {
              color: '#555555',
              fontSize: 14,
              bold: false,
              italic: false
            }
          }
        },
        areachart: {
          animation: {
            startup: true,
            duration: 350,
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
          fontSize: 14,
          legend: {
            position: 'top',
            alignment: 'end',
            maxLines: 2,
            textStyle: {
              color: '#555555'
            }
          },
          titlePosition: 'none',
          tooltip: {
            ignoreBounds: false,
            isHtml: false,
            showColorCode: true,
            textStyle: {
              color: '#555555',
              fontSize: 14,
              bold: false,
              italic: false
            }
          }
        }
      });
    });
  });

  /* eslint-disable */

  describe('DATA_TABLE_SAMPLES', function() {
    it('should be initialized', function() {
      expect(typeof DATA_TABLE_SAMPLES.linechart).toBe('object');
      expect(typeof DATA_TABLE_SAMPLES.columnchart).toBe('object');
      expect(typeof DATA_TABLE_SAMPLES.barchart).toBe('object');
      expect(typeof DATA_TABLE_SAMPLES.combochart).toBe('object');
      expect(typeof DATA_TABLE_SAMPLES.areachart).toBe('object');
      expect(typeof DATA_TABLE_SAMPLES.piechart).toBe('object');
    });
  });

  /* eslint-enable */
});


describe('Service: GoogleChartsService', function() {
  var $httpBackend;

  var GoogleChartsService;

  beforeEach(module('eagleeye'));

  beforeEach(module(function($provide) {
    $provide.constant('CHART_TYPE_OPTIONS', [{
      label: 'Line Chart',
      value: 'LineChart'
    }, {
      label: 'Column Chart',
      value: 'ColumnChart'
    }, {
      label: 'Image Chart',
      value: 'ImageChart'
    }]);
    $provide.constant('DATA_TABLE_SAMPLES', {
      linechart: {
        foo: 1
      },
      columnchart: {
        bar: 1
      }
    });
  }));

  // reset router
  beforeEach(module(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() { return false; });
  }));

  beforeEach(inject(function(_$httpBackend_, _GoogleChartsService_) {
    $httpBackend = _$httpBackend_;
    GoogleChartsService = _GoogleChartsService_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be able to create this service', function() {
    expect(!!GoogleChartsService).toBe(true);
  });

  describe('validateChartType()', function() {
    it('should return true when input a valid chart type', function() {
      expect(GoogleChartsService.validateChartType('LineChart')).toBe(true);
      expect(GoogleChartsService.validateChartType('ColumnChart')).toBe(true);
      expect(GoogleChartsService.validateChartType('ImageChart')).toBe(true);
    });

    it('should return false when input an invalid chart type', function() {
      expect(GoogleChartsService.validateChartType('')).toBe(false);
      expect(GoogleChartsService.validateChartType('linechart')).toBe(false);
      expect(GoogleChartsService.validateChartType('columnchart')).toBe(false);
      expect(GoogleChartsService.validateChartType('imagechart')).toBe(false);
      expect(GoogleChartsService.validateChartType('piechart')).toBe(false);
    });
  });

  describe('makeChartType()', function() {
    it('should return a chart type if input type is a valid chart type', function() {
      spyOn(GoogleChartsService, 'validateChartType').and.returnValue(true);
      expect(GoogleChartsService.makeChartType('LineChart')).toBe('LineChart');
      expect(GoogleChartsService.validateChartType).toHaveBeenCalledWith('LineChart');
    });

    it('should throw an error if input type is an invalid chart type', function() {
      spyOn(GoogleChartsService, 'validateChartType').and.returnValue(false);
      expect(function() {
        GoogleChartsService.makeChartType('foo');
      }).toThrow(new Error('foo is an invalid chart type. Available types are: LineChart, ColumnChart, BarChart, ComboChart, AreaChart and ImageChart.'));
      expect(GoogleChartsService.validateChartType).toHaveBeenCalledWith('foo');
    });
  });

  describe('makeChartAreaOptions()', function() {
    it('should return empty object if not passing parameters', function() {
      expect(GoogleChartsService.makeChartAreaOptions()).toEqual({});
      expect(GoogleChartsService.makeChartAreaOptions('')).toEqual({});
    });

    it('should return chartArea only contains the provided values', function() {
      expect(GoogleChartsService.makeChartAreaOptions({})).toEqual({});
      expect(GoogleChartsService.makeChartAreaOptions({ left: '10%' })).toEqual({ left: '10%' });
      expect(GoogleChartsService.makeChartAreaOptions({ width: '10%' })).toEqual({ width: '10%' });
      expect(GoogleChartsService.makeChartAreaOptions({ left: '', width: '10%' })).toEqual({ width: '10%' });
      expect(GoogleChartsService.makeChartAreaOptions({ left: '10%', width: '90%' })).toEqual({ left: '10%', width: '90%' });
    });
  });

  describe('makeAxisOptions()', function() {
    it('should return {} if options is not an object', function() {
      expect(GoogleChartsService.makeAxisOptions('')).toEqual({});
      expect(GoogleChartsService.makeAxisOptions()).toEqual({});
    });

    it('should return {} with an empty options object', function() {
      expect(GoogleChartsService.makeAxisOptions({})).toEqual({});
    });

    it('should return axisOptions with only title field', function() {
      expect(GoogleChartsService.makeAxisOptions({ title: 'foo' })).toEqual({
        title: 'foo'
      });
      expect(GoogleChartsService.makeAxisOptions({ title: 'foo' })).toEqual({
        title: 'foo'
      });
    });

    it('should return axisOptions with only format field', function() {
      expect(GoogleChartsService.makeAxisOptions({ format: 'foo' })).toEqual({
        format: 'foo'
      });
      expect(GoogleChartsService.makeAxisOptions({ format: 'foo' })).toEqual({
        format: 'foo'
      });
    });

    it('should return axisOptions with both title and format fields', function() {
      expect(GoogleChartsService.makeAxisOptions({ title: 'foo', format: 'bar' })).toEqual({
        title: 'foo',
        format: 'bar'
      });
      expect(GoogleChartsService.makeAxisOptions({ title: 'foo', format: 'bar' })).toEqual({
        title: 'foo',
        format: 'bar'
      });
    });
  });

  describe('hasIsStackedOption()', function() {
    it('should return true if given chart type supports isStacked', function() {
      expect(GoogleChartsService.hasIsStackedOption('ColumnChart')).toBe(true);
      expect(GoogleChartsService.hasIsStackedOption('BarChart')).toBe(true);
      expect(GoogleChartsService.hasIsStackedOption('ComboChart')).toBe(true);
      expect(GoogleChartsService.hasIsStackedOption('AreaChart')).toBe(true);
    });

    it('should return false if given chart type don not support isStacked', function() {
      expect(GoogleChartsService.hasIsStackedOption('LineChart')).toBe(false);
      expect(GoogleChartsService.hasIsStackedOption('ImageChart')).toBe(false);
    });
  });

  describe('hasComboLinesOption()', function() {
    it('should return true if given chart type supports combolines', function() {
      expect(GoogleChartsService.hasComboLinesOption('ComboChart')).toBe(true);
    });

    it('should return false if given chart type don not support combolines', function() {
      expect(GoogleChartsService.hasComboLinesOption('LineChart')).toBe(false);
      expect(GoogleChartsService.hasComboLinesOption('ImageChart')).toBe(false);
      expect(GoogleChartsService.hasComboLinesOption('ColumnChart')).toBe(false);
      expect(GoogleChartsService.hasComboLinesOption('BarChart')).toBe(false);
      expect(GoogleChartsService.hasComboLinesOption('AreaChart')).toBe(false);
      expect(GoogleChartsService.hasComboLinesOption('')).toBe(false);
    });
  });

  describe('makeConfigurationOptions()', function() {
    it('should return {} if chart type is invalid', function() {
      spyOn(GoogleChartsService, 'validateChartType').and.returnValue(false);
      expect(GoogleChartsService.makeConfigurationOptions('foo', { bar: 'bar' })).toEqual({});
      expect(GoogleChartsService.validateChartType).toHaveBeenCalledWith('foo');
    });

    describe('with a valid chart type,', function() {
      beforeEach(function() {
        spyOn(GoogleChartsService, 'validateChartType').and.returnValue(true);
        spyOn(GoogleChartsService, 'makeAxisOptions').and.returnValue({});
        spyOn(GoogleChartsService, 'makeChartAreaOptions').and.returnValue({});
        spyOn(GoogleChartsService, 'hasComboLinesOption').and.returnValue(false);
        spyOn(GoogleChartsService, 'hasIsStackedOption').and.returnValue(false);
      });

      it('should return options contains title field if title provided', function() {
        expect(GoogleChartsService.makeConfigurationOptions('foo', { title: 'bar' }).title).toBe('bar');
      });

      it('should return options contains empty title if title not provided', function() {
        expect(GoogleChartsService.makeConfigurationOptions('foo', {}).title).toBe('');
      });

      it('should return options contains hAxis and vAxis fields', function() {
        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          hAxis: { foo: 'foo' },
          vAxis: { bar: 'bar' }
        });

        expect(GoogleChartsService.makeAxisOptions).toHaveBeenCalledWith({ foo: 'foo' });
        expect(GoogleChartsService.makeAxisOptions).toHaveBeenCalledWith({ bar: 'bar' });
        expect(GoogleChartsService.makeAxisOptions).toHaveBeenCalledTimes(2);
        expect(opts.hAxis).toEqual({});
        expect(opts.vAxis).toEqual({});
      });

      it('should return options contains chartArea field', function() {
        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          chartArea: { foo: 'foo' }
        });

        expect(GoogleChartsService.makeChartAreaOptions).toHaveBeenCalledWith({ foo: 'foo' });
        expect(opts.chartArea).toEqual({});
      });

      it('should return options contains combolines field if supported', function() {
        GoogleChartsService.hasComboLinesOption.and.returnValue(true);

        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          combolines: 1
        });

        expect(GoogleChartsService.hasComboLinesOption).toHaveBeenCalledWith('foo');
        expect(opts.combolines).toBe(1);
      });

      it('should return options without combolines field if not supported', function() {
        GoogleChartsService.hasComboLinesOption.and.returnValue(false);

        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          combolines: 1
        });

        expect(GoogleChartsService.hasComboLinesOption).toHaveBeenCalledWith('foo');
        expect(opts.combolines).not.toBeDefined();
      });

      it('should return options contains isStacked field if supported', function() {
        GoogleChartsService.hasIsStackedOption.and.returnValue(true);

        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          isStacked: true
        });

        expect(GoogleChartsService.hasIsStackedOption).toHaveBeenCalledWith('foo');
        expect(opts.isStacked).toBe(true);
      });

      it('should return options without isStacked field if not supported', function() {
        GoogleChartsService.hasIsStackedOption.and.returnValue(false);

        var opts = GoogleChartsService.makeConfigurationOptions('foo', {
          isStacked: true
        });

        expect(GoogleChartsService.hasIsStackedOption).toHaveBeenCalledWith('foo');
        expect(opts.isStacked).not.toBeDefined();
      });
    });
  });

  describe('getChartDataTableSamples()', function() {
    it('should return empty object if input chart type is invalid', function() {
      expect(GoogleChartsService.getChartDataTableSamples('foo')).toEqual({});
    });

    it('should return datatable sample', function() {
      expect(GoogleChartsService.getChartDataTableSamples('LINECHART')).toEqual({
        foo: 1
      });
      expect(GoogleChartsService.getChartDataTableSamples('linechart')).toEqual({
        foo: 1
      });
      expect(GoogleChartsService.getChartDataTableSamples('COLUMNCHART')).toEqual({
        bar: 1
      });
      expect(GoogleChartsService.getChartDataTableSamples('columnchart')).toEqual({
        bar: 1
      });
    });
  });
});
