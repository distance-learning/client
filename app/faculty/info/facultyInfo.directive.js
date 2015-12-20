(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyInfo')
      .directive('facultyInfo', facultyInfo);

  facultyInfo.$inject = [];

  function facultyInfo() {
    return {
      replace: true,
      controller: 'FacultyController',
      controllerAs: 'facultyInfo',
      templateUrl: 'faculty/info/facultyInfo.html'
    };
  }
})();
