(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .directive('facultyList', facultyList);

  facultyList.$inject = [];

  function facultyList() {
    return {
      replace: true,
      controller: 'FacultyListController',
      controllerAs: 'facultyList',
      templateUrl: './faculty/list/facultyList.html'
    };
  }
})();
