'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:JobsController
 */
angular.module('eagleeye')
  .controller('JobsController', [
    '$state',
    '$filter',
    'EagleEyeWebService',
    function($state, $filter, EagleEyeWebService) {
      var controller = this;

      this.jobs = [];
      this.isLoading = true;
      this.totalJobs = 0;
      this.failureJobs = 0;
      this.lastUpdatedAt = null;

      this.loadJobs = function() {
        controller.isLoading = true;

        return EagleEyeWebService.getJobs().then(function(jobs) {
          controller.jobs = jobs;
          controller.isLoading = false;
          controller.lastUpdatedAt = new Date();

          controller.calculateTotalJobs(jobs);
          controller.calculateFailureJobs(jobs);
        });
      };

      this.deleteJob = function(jobId) {
        return EagleEyeWebService.deleteJob(jobId).then(function() {
          controller.loadJobs();
        });
      };

      this.restartJob = function(jobId) {
        return EagleEyeWebService.restartJob(jobId);
      };

      this.createJob = function() {
        $state.go('jobCreation');
      };

      this.calculateTotalJobs = function(jobs) {
        this.totalJobs = jobs.length;
      };

      this.calculateFailureJobs = function(jobs) {
        this.failureJobs = $filter('filter')(jobs, { lastState: 'failure' }).length;
      };

      this.init = function() {
        this.loadJobs();
      };

      this.init();
    }
  ]);
