'use strict';

angular.module('eagleeye')

  /**
   * @ngdoc service
   * @name eagleeye.CHART_TYPE_OPTIONS
   * @description All of the currently supported chart types.
   */
  .constant('CHART_TYPE_OPTIONS', [{
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
  }])

  /**
   * @ngdoc service
   * @name eagleeye.IS_STACKED_OPTIONS
   *
   * @description
   * Google charts' `isStacked` option.
   * Only some of the chart types have this options, like Bar Chart, Column Chart or Area Chart, etc.
   */
  .constant('IS_STACKED_OPTIONS', [{
    value: true,
    label: 'Yes'
  }, {
    value: false,
    label: 'No'
  }])

  /**
   * @ngdoc service
   * @name eagleeye.AXIS_FORMAT_OPTIONS
   *
   * @description
   * Google charts' `hAxis.format` or `vAxis.format` options.
   * It's a format string for numeric or date axis labels.
   * {@link https://developers.google.com/chart/interactive/docs/gallery/columnchart#configuration-options Configuration Options}
   * There're a few values in google charts' document, but we now only support 'percent'.
   *
   * @todo Value '' means default to auto but 'none'.
   */
  .constant('AXIS_FORMAT_OPTIONS', [{
    value: 'percent',
    label: 'Yes'
  }, {
    value: '',
    label: 'No'
  }])

  /**
   * @ngdoc service
   * @name eagleeye.DEFAULT_CHART_OPTIONS
   *
   * @description
   * Default google chart configuration options
   * {@link https://developers.google.com/chart/interactive/docs/gallery/columnchart#configuration-options Configuration Options}
   */
  .constant('DEFAULT_CHART_OPTIONS', {
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
  })

  /* eslint-disable */

  /**
   * @ngdoc service
   * @name eagleeye.DATA_TABLE_SAMPLES
   *
   * @description
   * Google charts data table samples。
   * {@link https://developers.google.com/chart/interactive/docs/datatables_dataviews DataTables and DataViews}
   */
  .constant('DATA_TABLE_SAMPLES', {
    linechart: { 'cols': [{ 'label': 'City', 'type': 'string' }, { 'label': '2010 Population', 'type': 'number' }, { 'label': '2000 Population', 'type': 'number' }], 'rows': [{ 'c': [{ 'v': 'New York City, NY' }, { 'v': 8175000 }, { 'v': 8008000 }] }, { 'c': [{ 'v': 'Los Angeles, CA' }, { 'v': 3792000 }, { 'v': 3694000 }] }, { 'c': [{ 'v': 'Chicago, IL' }, { 'v': 2695000 }, { 'v': 2896000 }] }, { 'c': [{ 'v': 'Houston, TX' }, { 'v': 2099000 }, { 'v': 1953000 }] }, { 'c': [{ 'v': 'Philadelphia, PA' }, { 'v': 1526000 }, { 'v': 1517000 }] }] },
    columnchart: { 'cols': [{ 'label': 'City', 'type': 'string' }, { 'label': '2010 Population', 'type': 'number' }, { 'label': '2000 Population', 'type': 'number' }], 'rows': [{ 'c': [{ 'v': 'New York City, NY' }, { 'v': 8175000 }, { 'v': 8008000 }] }, { 'c': [{ 'v': 'Los Angeles, CA' }, { 'v': 3792000 }, { 'v': 3694000 }] }, { 'c': [{ 'v': 'Chicago, IL' }, { 'v': 2695000 }, { 'v': 2896000 }] }, { 'c': [{ 'v': 'Houston, TX' }, { 'v': 2099000 }, { 'v': 1953000 }] }, { 'c': [{ 'v': 'Philadelphia, PA' }, { 'v': 1526000 }, { 'v': 1517000 }] }] },
    barchart: { 'cols': [{ 'label': 'City', 'type': 'string' }, { 'label': '2010 Population', 'type': 'number' }, { 'label': '2000 Population', 'type': 'number' }], 'rows': [{ 'c': [{ 'v': 'New York City, NY' }, { 'v': 8175000 }, { 'v': 8008000 }] }, { 'c': [{ 'v': 'Los Angeles, CA' }, { 'v': 3792000 }, { 'v': 3694000 }] }, { 'c': [{ 'v': 'Chicago, IL' }, { 'v': 2695000 }, { 'v': 2896000 }] }, { 'c': [{ 'v': 'Houston, TX' }, { 'v': 2099000 }, { 'v': 1953000 }] }, { 'c': [{ 'v': 'Philadelphia, PA' }, { 'v': 1526000 }, { 'v': 1517000 }] }] },
    combochart: { 'cols': [{ 'label': 'Month', 'type': 'string' }, { 'label': 'Average', 'type': 'number' }, { 'label': 'Bolivia', 'type': 'number' }, { 'label': 'Ecuador', 'type': 'number' }, { 'label': 'Madagascar', 'type': 'number' }, { 'label': 'Papua New Guinea', 'type': 'number' }, { 'label': 'Rwanda', 'type': 'number' }], 'rows': [{ 'c': [{ 'v': '2004/05' }, { 'v': 614.6 }, { 'v': 165 }, { 'v': 938 }, { 'v': 522 }, { 'v': 998 }, { 'v': 450 }] }, { 'c': [{ 'v': '2005/06' }, { 'v': 682 }, { 'v': 135 }, { 'v': 1120 }, { 'v': 599 }, { 'v': 1268 }, { 'v': 288 }] }, { 'c': [{ 'v': '2006/07' }, { 'v': 623 }, { 'v': 157 }, { 'v': 1167 }, { 'v': 587 }, { 'v': 807 }, { 'v': 397 }] }, { 'c': [{ 'v': '2007/08' }, { 'v': 609.4 }, { 'v': 139 }, { 'v': 1110 }, { 'v': 615 }, { 'v': 968 }, { 'v': 215 }] }, { 'c': [{ 'v': '2008/09' }, { 'v': 569.6 }, { 'v': 136 }, { 'v': 691 }, { 'v': 629 }, { 'v': 1026 }, { 'v': 366 }] }] },
    areachart: { 'cols': [{ 'label': 'Month', 'type': 'string' }, { 'label': 'Done', 'type': 'number' }, { 'label': 'Work', 'type': 'number' }, { 'label': 'Risks', 'type': 'number' }], 'rows': [{ 'c': [{ 'v': '2004/05' }, { 'v': 0 }, { 'v': 998 }, { 'v': 200 }] }, { 'c': [{ 'v': '2005/06' }, { 'v': 322 }, { 'v': 700 }, { 'v': 120 }] }, { 'c': [{ 'v': '2006/07' }, { 'v': 687 }, { 'v': 440 }, { 'v': 120 }] }, { 'c': [{ 'v': '2007/08' }, { 'v': 943 }, { 'v': 200 }, { 'v': 60 }] }, { 'c': [{ 'v': '2008/09' }, { 'v': 1154 }, { 'v': 0 }, { 'v': 0 }] }] }
  })

  /* eslint-enable */

  /**
   * @ngdoc service
   * @name eagleeye.GoogleChartsService
   * @requires eagleeye.CHART_TYPE_OPTIONS
   * @requires eagleeye.DATA_TABLE_SAMPLES
   * @description Exports a set of helper methods for generating google charts.
   */
  .factory('GoogleChartsService', [
    'CHART_TYPE_OPTIONS',
    'DATA_TABLE_SAMPLES',
    function GoogleChartsService(CHART_TYPE_OPTIONS, DATA_TABLE_SAMPLES) {
      var self = {};

      /**
       * @method
       * @name eagleeye.GoogleChartsService#validateChartType
       * @description Validate the given chart type. The chart type must exist in `CHART_TYPE_OPTIONS`
       * @param {string} type The chart type.
       * @returns {boolean} Indicate if it's an valid chart type or not.
       */
      self.validateChartType = function(type) {
        var isValid = false,
          len = CHART_TYPE_OPTIONS.length;

        while (len--) {
          if (CHART_TYPE_OPTIONS[len].value === type) {
            isValid = true;
            break;
          }
        }

        return isValid;
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#makeChartType
       * @description Get a valid chart type value according to input or get an error.
       * @param {string} type The chart type.
       * @returns {string|Error} An valid chart type or throw an error.
       */
      self.makeChartType = function(type) {
        if (self.validateChartType(type)) {
          return type;

        } else {
          throw new Error(type + ' is an invalid chart type. Available types are: LineChart, ColumnChart, BarChart, ComboChart, AreaChart and ImageChart.');
        }
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#makeChartAreaOptions
       *
       * @description
       *
       * Generate google chart `chartArea` configuration option.
       * {@link https://developers.google.com/chart/interactive/docs/gallery/linechart#configuration-options Configuration Options}.
       *
       * Note:
       * Google supports four properties in the `chartArea` option object. They're `left`, `top`, `width` and `height`.
       * But now in this app, we only support two: `left` and `width`!
       * And the values format must be a string, containing a number followed by %. For example, '30%'.
       *
       * @param {Object} options Input chart area option.
       *
       * @returns {Object} The `chartArea` configuration option object.
       *
       * @example
       * this.makeChartAreaOptions();                              // returns {}
       * this.makeChartAreaOptions({ left: '', width: '90%' });    // returns { width: '90%' }
       * this.makeChartAreaOptions({ left: '10%', width: '90%' }); // returns { left: '10%', width: '90%' }
       */
      self.makeChartAreaOptions = function(options) {
        var chartArea = {};

        if (angular.isObject(options)) {
          if (options.left) {
            chartArea.left = options.left;
          }

          if (options.width) {
            chartArea.width = options.width;
          }
        }

        return chartArea;
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#makeAxisOptions
       * @description Generate google charts `hAxis` or `vAxis` configuration option.
       * @param {Object} options Input axis options.
       * @returns {Object} `hAxis` or `vAxis` configuration option objects.
       */
      self.makeAxisOptions = function(options) {
        var axis = {};

        if (angular.isObject(options)) {
          if (options.title) {
            axis.title = options.title;
          }

          if (options.format) {
            axis.format = options.format;
          }
        }

        return axis;
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#hasIsStackedOption
       * @description Check if the given chart type has an `isStacked` option.
       * @param {Object} chartType Google chart type.
       * @returns {boolean}
       */
      self.hasIsStackedOption = function(chartType) {
        var supportedList = ['ColumnChart', 'BarChart', 'ComboChart', 'AreaChart'];

        return (supportedList.indexOf(chartType) > -1);
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#hasComboLinesOption
       * @description Check support `combolines` option or not. Only ComboChart support it.
       * @param {Object} chartType Google chart type.
       * @returns {boolean}
       * @todo The standard option is `series`'s `type`.
       */
      self.hasComboLinesOption = function(chartType) {
        var supportedList = ['ComboChart'];

        return (supportedList.indexOf(chartType) > -1);
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#makeConfigurationOptions
       * @description Generate a valid google chart configuration options object.
       * @param {Object} chartType Chart type.
       * @param {Object} options User input chart options.
       * @returns {Object} Google chart configuration options object.
       */
      self.makeConfigurationOptions = function(chartType, options) {
        var configurationOptions = {};

        if (!self.validateChartType(chartType)) return configurationOptions;


        configurationOptions.title = options.title || '';

        // `hAxis` & `vAxis`
        configurationOptions.hAxis = self.makeAxisOptions(options.hAxis);
        configurationOptions.vAxis = self.makeAxisOptions(options.vAxis);

        // `chartArea`
        configurationOptions.chartArea = self.makeChartAreaOptions(options.chartArea);

        // `combolines`
        if (self.hasComboLinesOption(chartType)) {
          configurationOptions.combolines = options.combolines;
        }

        // `isStacked`
        if (self.hasIsStackedOption(chartType)) {
          configurationOptions.isStacked = options.isStacked;
        }

        return configurationOptions;
      };

      /**
       * @method
       * @name eagleeye.GoogleChartsService#getChartDataTableSamples
       *
       * @description
       * According to chart type, it'll provide a sample data table for demo.
       *
       * @param {string} chartType      Chart type, like 'LineChart'.
       *
       * @returns {Object} The sample data table.
       */
      self.getChartDataTableSamples = function(chartType) {
        chartType = chartType.toLowerCase();

        return DATA_TABLE_SAMPLES[chartType] ? DATA_TABLE_SAMPLES[chartType] : {};
      };

      return self;
    }
  ]);
