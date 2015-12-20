(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty-info')
      .directive('facultyInfo', facultyInfo);

  facultyInfo.$inject = [];

  function facultyInfo() {
    return {
      replace: true,
      controller: 'FacultyListController',
      controllerAs: 'facultyInfo',
      templateUrl: 'faculty-info/faculty-info.html'
    };
  }
})();
