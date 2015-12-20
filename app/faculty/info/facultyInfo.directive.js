(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyInfo')
      .directive('facultyInfo', facultyInfo);

  facultyInfo.$inject = [];

  function facultyInfo() {
    return {
      replace: true,
      controller: 'FacultyInfoController',
      controllerAs: 'facultyInfo',
      templateUrl: 'faculty-info/faculty-info.html'
    };
  }
})();
