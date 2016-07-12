'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:ChartController
 * @description
 * # ChartController
 * Controller of the eagleeye
 */
angular.module('eagleeye')
  .controller('ChartController', [
    '$state',
    '$stateParams',
    '$location',
    'EagleEyeWebService',
    'eeShareService',
    'GoogleChartsService',
    function($state, $stateParams, $location, EagleEyeWebService, eeShareService, GoogleChartsService) {
      var controller = this,
        id = $stateParams.id;

      this.chartData = {};

      this.autoRefresh = false;

      this.autoInterval  = null ;

      this.autoChange = function(){
          if(this.autoRefresh == true){
            this.autoInterval =  setInterval(this.refreshChart,15000);
          }
          else if(this.autoRefresh == false){
            clearInterval(this.autoInterval);
            this.autoInterval = null;
          }
      }

      this.getChartDataById = function(id) {
        EagleEyeWebService.getChartById(id).then(function(data) {
          controller.chartData = data;
        });
      };

      controller.getChartDataById(id);

      this.showShare = function() {
        eeShareService.showShareDialog({
          sharedTitle: this.chartData.options.title,
          sharedLink: $location.absUrl()
        });
      };

      this.refreshChart = function() {
        var id = controller.chartData._id;
        controller.getChartDataById(id);
      };

      this.SaveImageOrPDF = function(fileType,chartData){

          function Save2Image(chart,chartData){
              var uri = chart.getImageURI();
              var aLink = document.createElement('a');
              var evt = document.createEvent("HTMLEvents");
              evt.initEvent("click", false, false);
              aLink.download = chartData.options.title;
              aLink.href = uri;
              aLink.dispatchEvent(evt);
             };

          function Save2PDF(chart,chartData){
                var uri = chart.getImageURI();
                var size =[ chart.ba + 20,  chart.Ea + 20];
                var doc = new jsPDF("l", "pt", "letter");
                doc.setFont("times");
                doc.setFontType("italic");
                doc.text(40, 20, "Provided by EagleEye");
                doc.text(40, 40, chartData.options.title);
                doc.addImage(uri, 'JPEG', 20, 40);
                doc.save(chartData.options.title);
          };
          var chart = new google.visualization[chartData.chartType](document.createElement("div"));
          // Wait for the chart to finish drawing before calling the getImageURI() method.
          google.visualization.events.addListener(chart, 'ready', function () {
              switch(fileType){
                case 0: Save2Image(chart,chartData); break;
                case 1: Save2PDF(chart,chartData); break;
              }
          });
          var defaultChartOptions = GoogleChartsService.getDefaultChartOptions();
          var chartDataTable = new google.visualization.DataTable(angular.copy(chartData.datatable, {}));
          var chartOptions = chartData.options;
          chartOptions.width = 1024;
          chartOptions.height = 768;
          chart.draw(chartDataTable, chartOptions);
      };
    }
  ]);
