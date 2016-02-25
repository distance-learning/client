(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .directive('testBuildQuestion', testBuildQuestion);

  testBuildQuestion.$inject = [];

  function testBuildQuestion() {
    return {
      replace: true,
      controller: 'TestBuildQuestionController',
      controllerAs: 'testBuildQuestion',
      templateUrl: './test/build/question/testBuildQuestion.html'
    };
  }
})();
