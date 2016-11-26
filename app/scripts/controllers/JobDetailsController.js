'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:JobDetailsController
 */
angular.module('eagleeye')
  .controller('JobDetailsController', [
    '$state',
    'EagleEyeWebService',
    function($state, EagleEyeWebService) {
      this.job = {
        enabled: true,
        customExpression: {}
      };

      this.expressionOptions = [{
        label: 'Use Custom Expression',
        value: 'custom'
      }, {
        label: 'Hourly',
        value: '0 * * * *'
      }, {
        label: 'Daily',
        value: '0 0 * * *'
      }, {
        label: 'Weekly',
        value: '0 0 * * 0'
      }, {
        label: 'Monthly',
        value: '0 0 1 * *'
      }, {
        label: 'Yearly',
        value: '0 0 1 1 *'
      }];

      /**
       * @method
       * @name getExpression
       * @description Calculate the cron expression of the scheduled job.
       * @params {Object} job
       * @returns {string} Final job expression.
       */
      this.getExpression = function(job) {
        if (job.expression !== 'custom') {
          return job.expression;

        } else {
          return [
            job.customExpression.minute,
            job.customExpression.hour,
            job.customExpression.dayOfMonth,
            job.customExpression.month,
            job.customExpression.dayOfWeek
          ].join(' ');
        }
      };

      /**
       * @method
       * @name makeJobPayload
       * @description Generate payload send to server.
       * @params {Object} job
       * @returns {Object} Payload object.
       */
      this.makeJobPayload = function(job) {
        var payload = {};

        payload.name = job.name;
        payload.enabled = job.enabled;
        payload.command = job.command;
        payload.expression = this.getExpression(job);

        return payload;
      };

      /**
       * @method
       * @name save
       * @description Send job payload to server.
       * @params {Object} job
       * @returns {promise}
       */
      this.save = function(job) {
        var payload = this.makeJobPayload(job);

        return EagleEyeWebService.createJob(payload).then(function() {
          $state.go('jobs');
        });
      };
    }
  ]);
