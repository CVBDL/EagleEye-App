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
      this.totalJobs = 0;
      this.failureJobs = 0;
      this.lastUpdatedAt = null;

      /** @default true */
      this.isLoading = true;

      /**
       * @method
       * @name loadJobs
       * @description Fetch jobs from server and initialize data model.
       * @returns {promise}
       */
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

      /**
       * @method
       * @name deleteJob
       * @description Delete specific job from server.
       * @params {string} jobId The `_id` property of a job.
       * @returns {promise}
       */
      this.deleteJob = function(jobId) {
        return EagleEyeWebService.deleteJob(jobId).then(function() {
          controller.loadJobs();
        });
      };

      /**
       * @method
       * @name restartJob
       * @description Restart a job immediately.
       * @params {string} jobId The `_id` property of a job.
       * @returns {promise}
       */
      this.restartJob = function(jobId) {
        return EagleEyeWebService.restartJob(jobId);
      };

      /**
       * @method
       * @name createJob
       * @description Route to job creation view.
       */
      this.createJob = function() {
        $state.go('jobCreation');
      };

      /**
       * @method
       * @name restartJob
       * @description Calculate total jobs count.
       * @params {Object} jobs The set of jobs.
       */
      this.calculateTotalJobs = function(jobs) {
        this.totalJobs = jobs.length;
      };

      /**
       * @method
       * @name restartJob
       * @description Calculate jobs count with `lastState` is 'failure'.
       * @params {Object} jobs The set of jobs
       */
      this.calculateFailureJobs = function(jobs) {
        this.failureJobs = $filter('filter')(jobs, { lastState: 'failure' }).length;
      };

      /**
       * @method
       * @name init
       */
      this.init = function() {
        this.loadJobs();
      };

      this.init();
    }
  ]);
