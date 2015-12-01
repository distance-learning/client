(function () {
  'use strict';

  angular
      .module('distanceLearning.faculty')
      .directive('faculty', faculty);

  faculty.$inject = [];

  function faculty() {
    return {
      replace: true,
      controller: 'FacultyController',
      controllerAs: 'faculty',
      templateUrl: 'faculty/faculty.html'
    };
  }
})();
