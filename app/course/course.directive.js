(function () {

  'use strict';

  angular
      .module('distanceLearning.course')
      .directive('course', course);

  course.$inject = [];

  function course() {
    return {
      replace: true,
      controller: 'CourseController',
      controllerAs: 'course',
      templateUrl: 'course/course.html'
    }
  }

})();
