(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .directive('testList', testList);

  testList.$inject = [];

  function testList() {
    return {
      replace: true,
      controller: 'TestListController',
      controllerAs: 'testList',
      templateUrl: './test/list/testList.html'
    };
  }
})();
