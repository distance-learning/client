(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .directive('testResult', testResult);

  testResult.$inject = [];

  function testResult() {
    return {
      replace: true,
      controller: 'TestResultController',
      controllerAs: 'testResult',
      templateUrl: './test/result/testResult.html'
    };
  }
})();
