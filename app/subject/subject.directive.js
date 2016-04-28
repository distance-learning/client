(function () {

  'use strict';

  angular
      .module('distanceLearning.subject')
      .directive('subject', subject);

  subject.$inject = [];

  function subject() {
    return {
      replace: true,
      controller: 'SubjectController',
      controllerAs: 'subject',
      templateUrl: 'subject/subject.html'
    }
  }

})();
