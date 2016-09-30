'use strict';

/**
 * @ngdoc service
 * @name eagleeye.eeSaveAsPDFService
 * @description
 * # eeSaveAsPDFService
 * Factory in the eagleeye.
 */
angular.module('eagleeye')
  .factory('eeSaveAsPDFService', [
    'GoogleChartsService',
    function(GoogleChartsService) {

      return {
        SaveImageOrPDF: SaveImageOrPDF
      };

      function SaveImageOrPDF(fileType, chartData) {
        var chart = new google.visualization[chartData.chartType](document.createElement("div"));

        // wait for the chart to finish drawing before calling the getImageURI() method
        google.visualization.events.addListener(chart, 'ready', function() {
          switch (fileType) {
            case 0:
              Save2Image(chart, chartData);
              break;
            case 1:
              Save2PDF(chart, chartData);
              break;
          }
        });

        var defaultChartOptions = GoogleChartsService.getDefaultChartOptions();
        var chartDataTable = new google.visualization.DataTable(angular.copy(chartData.datatable, {}));
        var chartOptions = angular.copy(chartData.options, {});
        if (chartData.chartType.toLowerCase() == "combochart") {
          if (isNaN(chartOptions.combolines) || chartOptions.combolines.length == 0) {
            chartOptions.combolines = 1;
          }
          chartOptions.seriesType = 'bars';
          chartOptions.series = {};
          for (var i = 0; i < chartOptions.combolines; i++) {
            chartOptions.series[i] = { type: 'line' };
          }
        }
        chartOptions.width = 1024;
        chartOptions.height = 768;
        chart.draw(chartDataTable, chartOptions);
      };

      function Save2Image(chart, chartData) {
        var uri = chart.getImageURI();
        var aLink = document.createElement('a');
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        aLink.download = chartData.options.title;
        aLink.href = uri;
        aLink.dispatchEvent(evt);
      }

      function Save2PDF(chart, chartData) {
        var uri = chart.getImageURI();
        var size = [chart.ba + 20, chart.Ea + 20];
        var doc = new jsPDF("l", "pt", "letter");
        doc.setFont("times");
        doc.setFontType("italic");
        doc.text(40, 20, "Provided by EagleEye");
        doc.text(40, 40, chartData.options.title);
        doc.addImage(uri, 'JPEG', 20, 40);
        doc.save(chartData.options.title);
      }

    }
  ]);
