'use strict';

/**
 * @ngdoc service
 * @name eagleeye.GoogleChartsService
 * @description
 * # GoogleChartsService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('GoogleChartsService', function () {
    var chartTypeOptions = [{
      label: 'Line Chart',
      value: 'LineChart',
      construcorName: 'LineChart'
    }, {
      label: 'Column Chart',
      value: 'ColumnChart',
      construcorName: 'ColumnChart'
    }, {
      label: 'Bar Chart',
      value: 'BarChart',
      construcorName: 'BarChart'
    }];

    // https://developers.google.com/chart/interactive/docs/reference#dataparam
    var chartDataTableSamples = {
      string: {
        cols: [{ type: 'string', label: 'Category' }, { type: 'number', label: 'Apple' }, { type: 'number', label: 'Orange' }],
        rows: [
          { c: [{ v: 'Apple' }, { v: 5 }, { v: 9 }] },
          { c: [{ v: 'Orange' }, { v: 7 }, { v: 3 }] }
        ]
      },
      number: {
        cols: [{ type: 'number', label: 'X' }, { type: 'number', label: 'Line 1' }, { type: 'number', label: 'Line 2' }],
        rows: [
          { c: [{ v: 1 }, { v: 5 }, { v: 9 }] },
          { c: [{ v: 2 }, { v: 7 }, { v: 3 }] }
        ]
      },
      date: {
        cols: [{ type: 'date', label: 'Date' }, { type: 'number', label: 'Apple' }, { type: 'number', label: 'Orange' }],
        rows: [
          { c: [{ v: 'Date(2016, 5, 12)' }, { v: 5 }, { v: 9 }] },
          { c: [{ v: 'Date(2016, 5, 13)' }, { v: 7 }, { v: 3 }] }
        ]
      },
      datetime: {
        cols: [{ type: 'datetime', label: 'Datetime' }, { type: 'number', label: 'Apple' }, { type: 'number', label: 'Orange' }],
        rows: [
          { c: [{ v: 'Date(2016, 5, 12, 10)' }, { v: 5 }, { v: 9 }] },
          { c: [{ v: 'Date(2016, 5, 12, 11)' }, { v: 7 }, { v: 3 }] }
        ]
      }
    };

    return {
      getChartTypeOptions: function () {
        return chartTypeOptions;
      },
      getChartDataTableSamples: function() {
        return chartDataTableSamples;
      }
    };
  });
