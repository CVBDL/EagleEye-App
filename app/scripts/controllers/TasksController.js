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
       * @method
       * @name loadJob
       * @description Fetch job details from server.
       * @params {string} jobId
       * @returns {promise}
       */
      this.loadJob = function(jobId) {
        return EagleEyeWebService.getJob(jobId).then(function(job) {
          controller.job = job;
        });
      };

      /**
       * @method
       * @name loadTasks
       * @description Fetch all tasks from server.
       * @params {string} jobId
       * @returns {promise}
       */
      this.loadTasks = function(jobId) {
        return EagleEyeWebService.getTasks($stateParams.id).then(function(tasks) {
          controller.tasks = tasks;
        });
      };

      /**
       * @method
       * @name init
       */
      this.init = function() {
        this.loadJob($stateParams.id);
        this.loadTasks($stateParams.id);
      };

      this.init();
    }
  ]);
