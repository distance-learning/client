(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty-home')
      .directive('facultyHome', facultyHome);

  facultyHome.$inject = [];

  function facultyHome() {
    return {
      replace: true,
      controller: 'FacultyController',
      controllerAs: 'facultyHome',
      templateUrl: 'faculty/home/faculty-home'
    };
  }
})();
