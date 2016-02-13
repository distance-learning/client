(function () {
  'use strict';

  angular
      .module('distanceLearning.facultyList')
      .directive('facultyPageInfo', facultyPageInfo);

  facultyPageInfo.$inject = [];

  function facultyPageInfo() {
    return {
      replace: true,
      controller: 'FacultyPageInfoController',
      controllerAs: 'facultyPageInfo',
      templateUrl: './faculty/list/info/facultyPage.html'
    };
  }
})();
