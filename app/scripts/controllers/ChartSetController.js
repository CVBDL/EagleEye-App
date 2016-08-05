'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartSetController
 * @description
 * # ChartSetController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartSetController', [
    '$rootScope',
    '$state',
    '$stateParams',
    '$location',
    'EagleEyeWebService',
    'eeShareService',
    'GoogleChartsService',
    function($rootScope, $state, $stateParams, $location, EagleEyeWebService, eeShareService, GoogleChartsService) {
      var controller = this,
        id = $stateParams.id;

      controller.charDataArray = [];

      this.autoRefresh = false;
      this.autoInterval = null;
      this.imageChartBaseUrl = EagleEyeWebService.getStaticServerSideImageBaseUrl();
      this.viewMode = 'list';  // or 'column'

      this.switchViewMode = function(mode) {
        this.viewMode = mode;
        $rootScope.$emit('ee.googlechart.redraw');
      };

      this.autoChange = function() {
        if (this.autoRefresh == true) {
          this.autoInterval = setInterval(this.refreshChartSet, 15000);
        } else if (this.autoRefresh == false) {
          clearInterval(this.autoInterval);
          this.autoInterval = null;
        }
      };

      this.getChartSetById = function(id) {
        controller.charDataArray = [];
        EagleEyeWebService.getChartSetById(id).then(function(settings) {
          controller.settings = settings;

          var chartsArray = controller.settings.charts;
          var chartCount = chartsArray.length == undefined ? 0 : chartsArray.length;

          for (var i = 0; i < chartCount; i++) {
            (function(i) {
              EagleEyeWebService.getChartById(chartsArray[i]).then(function(data) {
                controller.charDataArray[i] = data;
              });
            })(i)
          }
        });
      };

      controller.getChartSetById(id);

      this.refreshChartSet = function() {
        controller.getChartSetById(id);
      };

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.settings.title,
          sharedLink: $location.absUrl()
        });
      };

      this.goToChart = function(chart) {
        var id = chart.friendlyUrl || chart._id;

        $state.go('chart', {
          id: id
        });
      };

      this.Save2PDF = function(chartset) {
        var allImageCount = chartset.charDataArray.length;
        var imageCount = 0;
        var size = [1080 + 80, 576 + 20];
        var doc = new jsPDF("l", "pt", "letter");
        doc.setFont("times");
        doc.setFontType("italic");
        doc.text(40, 20, "Provided by EagleEye");
        var index = 0;
        var chart = new Array(allImageCount);
        for (index = 0; index < allImageCount; index++) {
          var chartData = chartset.charDataArray[index];
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
            doc.text(40, 40, chartset.charDataArray[imageCount].options.title);
            imageCount++;
            if (imageCount < allImageCount) {
              doc.addPage();
            }
            if (imageCount >= allImageCount) {
              doc.save(chartset.settings.title);
            }
          });
          var defaultChartOptions = GoogleChartsService.getDefaultChartOptions();
          var chartDataTable = new google.visualization.DataTable(angular.copy(chartData.datatable, {}));
          var chartOptions = angular.copy(chartData.options, {});
          if (chartData.chartType.toLowerCase() == "combochart") {
            chartOptions.seriesType = 'bars';
            chartOptions.series = { 0: { type: 'line' } };
          }
          chartOptions.width = 1024;
          chartOptions.height = 768;
          chart[index].draw(chartDataTable, chartOptions);
        }
      };

      this.SaveImageOrPDF = function(fileType, chartData) {
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
        var defaultChartOptions = GoogleChartsService.getDefaultChartOptions();
        var chartDataTable = new google.visualization.DataTable(angular.copy(chartData.datatable, {}));
        var chartOptions = angular.copy(chartData.options, {});
        if (chartData.chartType.toLowerCase() == "combochart") {
          chartOptions.seriesType = 'bars';
          chartOptions.series = { 0: { type: 'line' } };
        }
        chartOptions.width = 1024;
        chartOptions.height = 768;
        chart.draw(chartDataTable, chartOptions);
      };
    }
  ]);
