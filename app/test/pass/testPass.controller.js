(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestPassController', TestPassController);

  TestPassController.$inject = [
    '$log', '$location', '$routeParams', '$interval',
    '$rootScope',
    'LoginUtils', 'TestUtils', 'ProfileUtils'
  ];

  function TestPassController($log, $location, $routeParams, $interval,
                              $rootScope,
                              LoginUtils, TestUtils, ProfileUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    vm.timer = undefined;
    vm.loading = true;
    vm.type = {
      single: 'single',
      multiSelect: 'multiselect'
    };
    vm.questionTimer = 0;
    vm.test = {
      id: 123,
      name: 'Test 1',
      currentQuestionIndex: 0,
      countAnswered: 0,
      //time: 15,
      questions: [
        {
          id: 1,
          name: 'Question 1',
          type: 'multiselect',
          answers: [
            {id: 1, name: 'q1-a1'},
            {id: 2, name: 'q1-a2'},
            {id: 3, name: 'q1-a3'},
            {id: 4, name: 'q1-a4'}
          ],
          time: 5
        },
        {
          id: 2,
          name: 'Question 2',
          type: 'single',
          answers: [
            {id: 1, name: 'q2-a1'},
            {id: 2, name: 'q2-a2'},
            {id: 3, name: 'q2-a3'},
            {id: 4, name: 'q2-a4'}
          ],
          time: 5
        },
        {
          id: 3,
          name: 'Question 3',
          type: 'multiselect',
          answers: [
            {id: 1, name: 'q3-a1'},
            {id: 2, name: 'q3-a2'},
            {id: 3, name: 'q3-a3'},
            {id: 4, name: 'q3-a4'}
          ],
          time: 5
        }
      ]
    };

    init();
    function init() {
      vm.loading = true;
      if (testId == 123) {
        startTimer();
        prepareQuetionTimer();

        return vm.loading = false;
      }

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }
      if (!userHaveAccess()) { return $location.path('/home'); }

      TestUtils.getTest(testId)
          .then(function (ok) {
            vm.test = ok;
            startTimer();
            prepareQuetionTimer();

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }

    function userHaveAccess() {

      // TODO: check user access 2 test

      return true;
    }

    function startTimer() {
      vm.timer = $interval(function () {
        vm.questionTimer++;
        if (vm.test.time) {
          if (vm.questionTimer > vm.test.time) return testComplete();
          return;
        }
        if (vm.test.questions[vm.test.currentQuestionIndex].time < vm.questionTimer) {
          vm.nextQuestion();
        }
      }, 1000);
    }


    function stopTimer() {
      $interval.cancel(vm.timer);
      vm.timer = undefined;
      vm.questionTimer = 0;
    }

    function restartTimer() {
      if (vm.test.time) { return; }
      stopTimer();
      startTimer();
    }

    function nextQuestionIndex(current) {
      var index = current;

      while (true) {
        index++;
        if (index == current) {
          if (vm.test.questions[index].answered) { return -1; }
        }
        if (index > vm.test.questions.length - 1) { index = 0; }
        if (!vm.test.questions[index].answered) { return index; }
      }
    }

    function prepareQuetionTimer() {
      if (!vm.test.time) { return; }

      for (var i in vm.test.questions) {
        vm.test.questions[i].time = vm.test.time;
      }
    }

    function testComplete() {
      TestUtils.completeTest(vm.test)
          .then(function (ok) {
            stopTimer();

            $rootScope.notification('Тест завершено');

            $location.path('/home');
          }, function (err) {
            $log.log('[ERROR] TestPassController.testComplete().TestUtils.completeTest()', err);
          });
    }

    vm.skipQuestion = function () {
      var predIndex = vm.test.currentQuestionIndex;
      vm.test.questions[predIndex].answered = false;
      vm.test.currentQuestionIndex = nextQuestionIndex(predIndex);
      if (predIndex != vm.test.currentQuestionIndex) {
        restartTimer();
      }
    };

    vm.nextQuestion = function () {
      restartTimer();
      vm.test.countAnswered++;
      vm.test.questions[vm.test.currentQuestionIndex].answered = true;
      vm.test.currentQuestionIndex = nextQuestionIndex(vm.test.currentQuestionIndex);

      if (vm.test.currentQuestionIndex == -1) {
        return testComplete();
      }
    };
  }
})();