'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:TasksController
 */
angular.module('eagleeye')
  .controller('TasksController', [
    function() {
      this.job = {
        "_id": "57fca45d69ea5f081a6b4076",
        "name": "Code Review By Month",
        "expression": "0 0 * * *",
        "command": "/path/to/command/codecollaborator2eagleeye.exe",
        "enabled": true,
        "createdAt": "2016-10-06T11:00:00.000Z",
        "updatedAt": "2016-10-06T11:00:00.000Z",
        "lastState": "success",
        "lastStartedAt": "2016-10-08T11:00:00.000Z",
        "lastFinishedAt": "2016-10-08T11:01:15.000Z"
      };

      this.tasks = [{
        "_id": "25dca45d69ea5f991a6b407a",
        "job": {
          "_id": "57fca45d69ea5f081a6b4076",
          "name": "Code Review By Month",
          "expression": "0 0 * * *",
          "command": "/path/to/command/codecollaborator2eagleeye.exe",
          "enabled": true,
          "createdAt": "2016-10-06T11:00:00.000Z",
          "updatedAt": "2016-10-06T11:00:00.000Z",
          "lastState": "success",
          "lastStartedAt": "2016-10-08T11:00:00.000Z",
          "lastFinishedAt": "2016-10-07T11:00:00.000Z"
        },
        "createdAt": "2016-10-08T00:01:00.000Z",
        "startedAt": "2016-10-08T00:01:00.000Z",
        "finishedAt": "2016-10-08T00:01:11.111Z",
        "state": "running"
      }, {
        "_id": "25dca45d69ea5f991a6b4076",
        "job": {
          "_id": "57fca45d69ea5f081a6b4076",
          "name": "Code Review By Month",
          "expression": "0 0 * * *",
          "command": "/path/to/command/codecollaborator2eagleeye.exe",
          "enabled": true,
          "createdAt": "2016-10-06T11:00:00.000Z",
          "updatedAt": "2016-10-06T11:00:00.000Z",
          "lastState": "success",
          "lastStartedAt": "2016-10-08T11:00:00.000Z",
          "lastFinishedAt": "2016-10-07T11:00:00.000Z"
        },
        "createdAt": "2016-10-08T00:01:00.000Z",
        "startedAt": "2016-10-08T00:01:01.000Z",
        "finishedAt": "2016-10-08T00:01:05.000Z",
        "state": "success"
      }, {
        "_id": "25dca45d69ea5f991a6b40b6",
        "job": {
          "_id": "57fca45d69ea5f081a6b4076",
          "name": "Code Review By Month",
          "expression": "0 0 * * *",
          "command": "/path/to/command/codecollaborator2eagleeye.exe",
          "enabled": true,
          "createdAt": "2016-10-06T11:00:00.000Z",
          "updatedAt": "2016-10-06T11:00:00.000Z",
          "lastState": "success",
          "lastStartedAt": "2016-10-08T11:00:00.000Z",
          "lastFinishedAt": "2016-10-07T11:00:00.000Z"
        },
        "createdAt": "2016-10-09T00:01:00.000Z",
        "startedAt": "2016-10-09T00:01:00.000Z",
        "finishedAt": "2016-10-09T00:01:11.111Z",
        "state": "failure"
      }];

      this.loadTasks = function(jobId) {

      };
    }
  ]);
