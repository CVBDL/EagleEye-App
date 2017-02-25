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
     * Fetch jobs from server and initialize data model.
     *
     * @method
     * @returns {promise}
     */
    this.loadJobs = function() {
      controller.isLoading = true;

      return EagleEyeWebService.getJobs()
        .then(function(jobs) {
          controller.jobs = jobs;
          controller.isLoading = false;
          controller.lastUpdatedAt = new Date();

          controller.calculateTotalJobs(jobs);
          controller.calculateFailureJobs(jobs);
        });
    };

    /**
     * Delete specific job from server.
     *
     * @method
     * @params {string} jobId The `_id` property of a job.
     * @returns {promise}
     */
    this.deleteJob = function(jobId) {
      return EagleEyeWebService.deleteJob(jobId)
        .then(function() {
          controller.loadJobs();
        });
    };

    /**
     * Restart a job immediately.
     *
     * @method
     * @params {string} jobId The `_id` property of a job.
     * @returns {promise}
     */
    this.restartJob = function(jobId) {
      return EagleEyeWebService.restartJob(jobId);
    };

    /**
     * Route to job creation view.
     *
     * @method
     */
    this.createJob = function() {
      $state.go('jobCreation');
    };

    /**
     * Calculate total jobs count.
     *
     * @method
     * @params {Object} jobs The set of jobs.
     */
    this.calculateTotalJobs = function(jobs) {
      this.totalJobs = jobs.length;
    };

    /**
     * Calculate jobs count with `lastState` is 'failure'.
     *
     * @method
     * @params {Object} jobs The set of jobs
     */
    this.calculateFailureJobs = function(jobs) {
      this.failureJobs =
        $filter('filter')(jobs, { lastState: 'failure' }).length;
    };

    /**
     * @method
     */
    this.init = function() {
      this.loadJobs();
    };

    this.init();
  }
]);
