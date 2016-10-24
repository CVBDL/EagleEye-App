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
    'DEFAULT_CHART_OPTIONS',
    function(GoogleChartsService, DEFAULT_CHART_OPTIONS) {

      return {
        SaveImageOrPDF: SaveImageOrPDF,
        saveChartSetAsPdf: saveChartSetAsPdf,
        saveChartSetAsImageOrPdf: saveChartSetAsImageOrPdf
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

        var defaultChartOptions = DEFAULT_CHART_OPTIONS;
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

      function getBase64FromImage(id) {
        var img = document.getElementById(id);
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;
        canvas.width = 1024;
        canvas.height = 768;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL("image/png");
      }

      function saveChartSetAsPdf(chartset) {
        var doc = new jsPDF("l", "pt", "letter");
        doc.setFont("times"); -
        doc.setFontType("italic");
        doc.text(40, 20, "Provided by EagleEye");
        var allImageArray = new Array();
        for (var i = 0; i < chartset.charts.length; i++) {
          if (chartset.charts[i].chartType.indexOf('ImageChart') > -1) {
            if (chartset.charts[i].image_file_name === undefined) {
              continue;
            }
            var dataURL = getBase64FromImage(chartset.charts[i].options.title);
            doc.addImage(dataURL, 'JPEG', 20, 60);
            doc.setFont("times");
            doc.setFontType("italic");
            doc.text(40, 40, "gg");
            doc.addPage();
          } else {
            allImageArray.splice(i, 1, chartset.charts[i]);
          }
        }
        var allImageCount = allImageArray.length;
        var imageCount = 0;
        var size = [1080 + 80, 576 + 20];
        var index = 0;
        var chart = new Array(allImageCount);
        for (index = 0; index < allImageCount; index++) {
          var chartData = allImageArray[index];
          if (chartData.chartType.indexOf('LineChart') > -1)
            chart[index] = new google.visualization.LineChart(document.createElement("div"));
          else if (chartData.chartType.indexOf('ColumnChart') > -1)
            chart[index] = new google.visualization.ColumnChart(document.createElement("div"));
          else if (chartData.chartType.indexOf('BarChart') > -1)
            chart[index] = new google.visualization.BarChart(document.createElement("div"));
          else if (chartData.chartType.indexOf('AreaChart') > -1)
            chart[index] = new google.visualization.AreaChart(document.createElement("div"));
          else
            chart[index] = new google.visualization.ComboChart(document.createElement("div"));
          // Wait for the chart to finish drawing before calling the getImageURI() method.
          google.visualization.events.addListener(chart[index], 'ready', function() {
            doc.addImage(chart[imageCount].getImageURI(), 'JPEG', 20, 60);
            doc.setFont("times");
            doc.setFontType("italic");
            doc.text(40, 40, allImageArray[imageCount].options.title);
            imageCount++;
            if (imageCount < allImageCount) {
              doc.addPage();
            }
            if (imageCount >= allImageCount) {
              doc.save(chartset.title);
            }
          });
          var defaultChartOptions = DEFAULT_CHART_OPTIONS;
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
          chart[index].draw(chartDataTable, chartOptions);
        }
      };

      function saveChartSetAsImageOrPdf(fileType, chartData) {
        function Save2Image(chart, chartData) {
          var uri = chart.getImageURI();
          var aLink = document.createElement('a');
          var evt = document.createEvent("HTMLEvents");
          evt.initEvent("click", false, false);
          aLink.download = chartData.options.title;
          aLink.href = uri;
          aLink.dispatchEvent(evt);
        };

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
        };
        var chart;
        if (chartData.chartType.indexOf('LineChart') > -1)
          chart = new google.visualization.LineChart(document.createElement("div"));
        else if (chartData.chartType.indexOf('ColumnChart') > -1)
          chart = new google.visualization.ColumnChart(document.createElement("div"));
        else if (chartData.chartType.indexOf('BarChart') > -1)
          chart = new google.visualization.BarChart(document.createElement("div"));
        else if (chartData.chartType.indexOf('AreaChart') > -1)
          chart = new google.visualization.AreaChart(document.createElement("div"));
        else
          chart = new google.visualization.ComboChart(document.createElement("div"));
        // Wait for the chart to finish drawing before calling the getImageURI() method.
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
        var defaultChartOptions = DEFAULT_CHART_OPTIONS;
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

    }
  ]);
