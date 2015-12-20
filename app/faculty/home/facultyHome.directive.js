(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyHome')
      .directive('facultyHome', facultyHome);

  facultyHome.$inject = [];

  function facultyHome() {
    return {
      replace: true,
      controller: 'FacultyController',
      controllerAs: 'facultyHome',
      templateUrl: 'faculty/home/facultyHome.html'
    };
  }
})();
