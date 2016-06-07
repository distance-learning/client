(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestResultController', TestResultController);

  TestResultController.$inject = [
    '$log', '$routeParams',
    '$mdSidenav',
    'TestUtils'
  ];

  function TestResultController($log, $routeParams,
                                $mdSidenav,
                                TestUtils) {
    var vm = this;
    var testCode = $routeParams.testId;
    vm.testHistory = [
      {
        question: { name: 'qustion 1' },
        answer: true
      },
      {
        question: { name: 'qustion 1' },
        answer: true
      },
      {
        question: { name: 'qustion 1' },
        answer: false
      },
      {
        question: { name: 'qustion 1' },
        answer: true
      }
    ];
    vm.loading = true;
    vm.testResult = {};

    getTestResult(testCode);
    function getTestResult(testCode) {
      vm.loading = true;
      if (testCode == '1f9d41bbab98d1434c925371bf664d3e35') {
        vm.testResult = {
          id: 1,
          code: '1f9d41bbab98d1434c925371bf664d3e35',
          name: 'Test name',
          totalQuestion: 20,
          endDate: new Date(),
          group: {
            name: 'Group name',
            students: [
              { id: 1, surname: 'User surname 1', name: 'user name 1', correctAnswered: 5, points: 25 },
              { id: 2, surname: 'User surname 2', name: 'user name 2', correctAnswered: 10, points: 50 },
              { id: 3, surname: 'User surname 3', name: 'user name 3', correctAnswered: 15, points: 75 },
              { id: 4, surname: 'User surname 4', name: 'user name 4', correctAnswered: 20, points: 100 }
            ]
          }
        };

        vm.loading = false;
        return;
      }

      TestUtils.getTestResult()
          .then(function (testResult) {
            vm.testResult = testResult;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestResultController.getTestResult().TestUtils.getTestResult()', err);
          })
    }

    vm.getBackgroundColor = function (point) {
      if (1 <= point && point <= 34) return 'F';
      if (35 <= point && point <= 59) return 'FX';
      if (60 <= point && point <= 66) return 'E';
      if (67 <= point && point <= 74) return 'D';
      if (75 <= point && point <= 81) return 'C';
      if (82 <= point && point <= 89) return 'B';
      if (90 <= point && point <= 100) return 'A';
    };

    vm.showTestHistory = function (student) {
      $mdSidenav("testHistory").open();
      //vm.loadingTargetTestResult = true;
      //
      //TestUtils.getTestHistory(student)
      //    .then(function (testHistory){
      //      vm.testHistory = testHistory;
      //
      //      vm.loadingTargetTestResult = false;
      //    }, function (err) {
      //      $log.log('[ERROR] TestResultController.showTestHistory().TestUtils.getTestHistory()', err);
      //    });
    };
  }
})();
