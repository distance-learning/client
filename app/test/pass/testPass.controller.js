(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestPassController', TestPassController);

  TestPassController.$inject = [
    '$log', '$location', '$routeParams', '$timeout', '$interval',
    '$rootScope',
    'LoginUtils', 'TestUtils', 'ProfileUtils'
  ];

  function TestPassController($log, $location, $routeParams, $timeout, $interval,
                              $rootScope,
                              LoginUtils, TestUtils, ProfileUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    vm.loading = true;
    vm.questionCount = 0;
    vm.type = {
      single: 'single',
      multiSelect: 'multiselect'
    };
    vm.ticker = undefined;
    vm.tickerSecond = 0;

    var indexQuestion = 0;
    vm.UIQuestion = {
      id: 1,
      name: 'question name',
      time: 0,
      type: 'single',
      is_skip: true,
      answers: [
        { id: 1, body: 'q1-a1', question_id: 1, isSelect: false },
        { id: 2, body: 'q1-a2', question_id: 1, isSelect: true },
        { id: 3, body: 'q1-a3', question_id: 1, isSelect: false }
      ],
      answerId: 1
    };
    vm.answers = [];

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      TestUtils.getTestPass(testId)
          .then(function (ok) {
            vm.test = ok.test;
            vm.test.questions = ok.questions;
            prepareTime();

            vm.questionCount = vm.test.questions.length;
            vm.UIQuestion = vm.test.questions[indexQuestion];
            dropQuestion();

            vm.ticker = $interval(function() {
              vm.tickerSecond += 1000;
              checkTime();
              console.log(vm.tickerSecond);
            }, 1000);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }

    function prepareTime() {
      for(var i in vm.test.questions) vm.test.questions[i].time *= 1000;
    }

    function dropQuestion() {
      if (!hasChangeQuestion()) { return; }

      vm.test.questions.splice(indexQuestion, 1);
    }

    function swap() {
      if (hasChangeQuestion()) { return; }

      var questionLength = vm.test.questions.length;
      var question = vm.test.questions[indexQuestion];
      vm.test.questions[indexQuestion] = vm.test.questions[questionLength];
      vm.test.questions[questionLength] = question;
    }

    function jump() {
      vm.test.questions.push(vm.UIQuestion);
      vm.UIQuestion = vm.test.questions[indexQuestion];
      dropQuestion();
    }

    function hasChangeQuestion() {
      return vm.test.questions.length >= 1;
    }

    function askFoQuestion() {
      console.log('askFoQuestion UIQuestion = ', vm.UIQuestion);
      var answer = {
        question_id: vm.UIQuestion.id,
        answers: []
      };

      if (vm.UIQuestion.type == vm.type.single) {
        if (vm.UIQuestion.answerId)
          answer.answers.push(vm.UIQuestion.answerId);

        return vm.answers.push(answer);
      }

      for(var i in vm.UIQuestion.answers) {
        if (vm.UIQuestion.answers[i].isSelect) {
          answer.answers.push(vm.UIQuestion.answers[i].id);
        }
      }

      vm.answers.push(answer);

      console.log('askFoQuestion ans = ', vm.answers);
    }


    function checkTime() {
      if (vm.UIQuestion.time != vm.tickerSecond) { return; }

      stopTimer();
      console.log('askFoQuestion');
      askFoQuestion();

      if (!hasChangeQuestion()) {
        completeTest();
      } else {
        vm.UIQuestion = vm.test.questions[indexQuestion];
        dropQuestion();
      }
    }

    function stopTimer() {
      console.log('stopTimer', 123);
      vm.tickerSecond = 0;
      console.log('tickerSecond', vm.tickerSecond);
    }

    function completeTest() {
      if (angular.isDefined(vm.ticker)) {
        $interval.cancel(vm.ticker);
        vm.ticker = undefined;
      }

      TestUtils.completeTest(vm.answers)
          .then(function (ok) {
            $rootScope.notification('Тест завершено');

            $location.path('/home');
          }, function (err) {
            $rootScope.notification(err);
          })
    }

    vm.skipQuestion = function () {
      if (!hasChangeQuestion()) { return; }
      jump();

      stopTimer();
    };

    vm.nextQuestion = function () {
      stopTimer();
      askFoQuestion();

      if (!hasChangeQuestion()) { completeTest(); }
      else {
        vm.UIQuestion = vm.test.questions[indexQuestion];
        dropQuestion();
      }
    };

    vm.isSkipQuestion = function () {
      return !vm.UIQuestion.is_skip;
    };
  }
})();