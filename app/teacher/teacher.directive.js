(function () {
  'use strict';

  angular
      .module('distanceLearning.teacher')
      .directive('teacher', teacher);

  teacher.$inject = [];

  function teacher() {
    return {
      replace: true,
      controller: 'TeacherController',
      controllerAs: 'teacher',
      templateUrl: 'teacher/teacher.html'
    };
  }
})();
