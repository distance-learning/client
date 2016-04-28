(function () {
  'use strict';

  angular
      .module('distanceLearning.subject')
      .directive('subjectPageInfo', subjectPageInfo);

  subjectPageInfo.$inject = [];

  function subjectPageInfo() {
    return {
      replace: true,
      controller: 'SubjectInfoController',
      controllerAs: 'subjectPageInfo',
      templateUrl: './subject/info/subjectPage.html'
    };
  }
})();
