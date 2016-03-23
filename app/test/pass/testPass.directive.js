(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .directive('testPass', testPass);

  testPass.$inject = [];

  function testPass() {
    return {
      replace: true,
      controller: 'TestPassController',
      controllerAs: 'testPass',
      templateUrl: './test/pass/testPass.html'
    };
  }
})();
