(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestPassController', TestPassController);

  TestPassController.$inject = [
    '$log', '$location', '$routeParams',
    'LoginUtils', 'TestUtils', 'ProfileUtils'
  ];

  function TestPassController($log, $location, $routeParams,
                              LoginUtils, TestUtils, ProfileUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    vm.loading = true;
    vm.testOption = {
      current: 1
    };
    vm.test = {
      id: 123,
      name: 'Tsest 1',
      current: 1,
      questions: [
        {
          id: 1,
          name: 'Question 1',
          answers: [
            { id: 1, name: 'q1-a1' },
            { id: 2, name: 'q1-a2' },
            { id: 3, name: 'q1-a3' },
            { id: 4, name: 'q1-a4' }
          ]
        },
        {
          id: 2,
          name: 'Question 2',
          answers: [
            { id: 1, name: 'q2-a1' },
            { id: 2, name: 'q2-a2' },
            { id: 3, name: 'q2-a3' },
            { id: 4, name: 'q2-a4' }
          ]
        },
        {
          id: 3,
          name: 'Question 3',
          answers: [
            { id: 1, name: 'q3-a1' },
            { id: 2, name: 'q3-a2' },
            { id: 3, name: 'q3-a3' },
            { id: 4, name: 'q3-a4' }
          ]
        }
      ]
    };
    vm.question = {
      currentTime: 0,
      totalTime: 15
    };

    init();
    function init() {
      vm.loading = true;
      if (testId == 123) {
        console.log(vm.test, 'loading');
        return vm.loading = false;
      }

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if (!userHaveAccess()) { return $location.path('/home'); }

      TestUtils.getTest(testId)
          .then(function (ok) {
            vm.test = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }

    function userHaveAccess() {

      // TODO: check user access 2 test

      return true;
    }
  }
})();