'use strict';

/**
 * @ngdoc function
 * @name eagleeye.controller:FilterDialogController
 */
angular.module('eagleeye')

.controller('FilterDialogController', [
  '$mdDialog',
  'datatable',
  function($mdDialog, datatable) {

    this.dt = angular.copy(datatable, {});

    /**
     * Hide dialog and reject the promise returned from $mdDialog.show().
     *
     * @method
     */
    this.cancel = function() {
      $mdDialog.cancel();
    };

    this.selectAll = function(colsrows) {
      colsrows.forEach(function(colrow) {
        colrow.isHide = false;
      });
    };

    this.unSelectAll = function(colsrows) {
      colsrows.forEach(function(colrow) {
        colrow.isHide = true;
      });
    };

    this.toggleAll = function(colsrows) {
      if (this.isChecked(colsrows)) {
        this.unSelectAll(colsrows);

      } else {
        this.selectAll(colsrows);
      }
    };

    this.isChecked = function(colsrows) {
      var result = colsrows.filter(function(colrow) {
        return colrow.isHide;
      });

      return result.length === 0;
    };

    this.isIndeterminate = function(colsrows) {
      var result = colsrows.filter(function(colrow) {
        return colrow.isHide;
      });

      return (result.length > 0 && result.length < colsrows.length);
    };

    this.filterCategory = function(dt) {
      var datatable = {};
      datatable.cols = angular.copy(dt.cols);
      datatable.rows = angular.copy(dt.rows).filter(function(row) {
        return !row.isHide;
      });

      return datatable;
    };

    this.filterColumn = function(dt) {
      var datatable = {};
      var hideIndexes = dt.cols.map(function(col, index) {
        if (col.isHide) {
          return index;

        } else {
          return -1;
        }
      });
      datatable.cols = angular.copy(dt.cols).filter(function(col) {
        return !col.isHide;
      });
      datatable.rows = angular.copy(dt.rows).map(function(row, index) {
        var c = row.c.filter(function(cell, index) {
          return hideIndexes.indexOf(index) < 0;
        });
        return { c: c };
      });

      return datatable;
    };

    this.apply = function(dt) {
      var datatable = this.filterCategory(dt);
      datatable = this.filterColumn(datatable);
      $mdDialog.hide(datatable);
    };
  }
]);
