'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:JobsController
 */
angular.module('eagleeye')
  .controller('JobsController', [
    '$state',
    function($state) {
      this.jobs = [{
        _id: '1',
        name: 'Code Reviews By Month',
        status: 'Success'
      }, {
        _id: '2',
        name: 'Code Reviews By Product',
        status: 'Success'
      }, {
        _id: '3',
        name: 'Defects By Month',
        status: 'Failure'
      }, {
        _id: '4',
        name: 'Defects By Product',
        status: 'Success'
      }];

      this.lastUpdatedAt = new Date();

      this.createJob = function() {
        $state.go('jobCreation');
      };
    }
  ]);
