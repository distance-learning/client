(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .directive('testBuild', testBuild);

  testBuild.$inject = [];

  function testBuild() {
    return {
      replace: true,
      controller: 'TestBuildController',
      controllerAs: 'testBuild',
      templateUrl: './test/build/testBuild.html'
    };
  }
})();
