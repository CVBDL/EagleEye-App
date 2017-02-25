'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:TasksController
 */
angular.module('eagleeye')

.controller('TasksController', [
  '$stateParams',
  'EagleEyeWebService',
  function($stateParams, EagleEyeWebService) {
    var controller = this;

    this.job = {};

    this.tasks = [];

    /**
     * Fetch job details from server.
     *
     * @method
     * @params {string} jobId
     * @returns {promise}
     */
    this.loadJob = function(jobId) {
      return EagleEyeWebService.getJob(jobId)
        .then(function(job) {
          controller.job = job;
        });
    };

    /**
     * Fetch all tasks from server.
     *
     * @method
     * @params {string} jobId
     * @returns {promise}
     */
    this.loadTasks = function(jobId) {
      return EagleEyeWebService.getTasks($stateParams.id)
        .then(function(tasks) {
          controller.tasks = tasks;
        });
    };

    /**
     * @method
     */
    this.init = function() {
      this.loadJob($stateParams.id);
      this.loadTasks($stateParams.id);
    };

    this.init();
  }
]);
