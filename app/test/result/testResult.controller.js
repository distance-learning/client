(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestResultController', TestResultController);

  TestResultController.$inject = [
    '$log', '$rootScope',
    '$mdSidenav',
    'TestUtils'
  ];

  function TestResultController($log, $rootScope,
                                $mdSidenav,
                                TestUtils) {
    var vm = this;
    vm.tests = [];
    vm.searchFileIconURL = '../assests/images/ic_search_black_24px.svg';
    vm.testHistory = [];
    vm.testStudentHistoryInfo = [];
    vm.loading = true;
    vm.testResult = {};
    vm.searchInfo = {
      to_date: new Date(),
      from_date: new Date()
    };

    init();
    function init() {
      vm.loading = true;

      getHistoryTest();
    }

    function getHistoryTest() {
      vm.loading = true;
      TestUtils.getTestForShowHistory()
          .then(function (tests) {
            vm.tests = tests;

            vm.loading = false;
          }, function (err) {
            $rootScope.notification(err);
          });
    }

    vm.getBackgroundColor = function (student) {
      var point = student.score * 100 / student.score_total;

      if (1 <= point && point <= 34) return 'F';
      if (35 <= point && point <= 59) return 'FX';
      if (60 <= point && point <= 66) return 'E';
      if (67 <= point && point <= 74) return 'D';
      if (75 <= point && point <= 81) return 'C';
      if (82 <= point && point <= 89) return 'B';
      if (90 <= point && point <= 100) return 'A';
    };

    vm.showStudentTestHistory = function (student) {
      vm.testStudentHistoryInfo = student;

      $mdSidenav("testHistory").open();
    };

    vm.searchTestResult = function () {
      TestUtils.getTestHistoryByInterval(vm.searchInfo)
          .then(function (ok) {
            vm.testHistory = ok;
          }, function (err) {
            $rootScope.notification(err);
          });
    };
  }
})();
