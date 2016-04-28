(function () {
  'use strict';

  angular
      .module('distanceLearning.course')
      .directive('coursePageInfo', coursePageInfo);

  coursePageInfo.$inject = [];

  function coursePageInfo() {
    return {
      replace: true,
      controller: 'CourseInfoController',
      controllerAs: 'coursePageInfo',
      templateUrl: './course/info/coursePage.html'
    };
  }
})();
