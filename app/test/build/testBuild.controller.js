(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildController', TestBuildController);

  TestBuildController.$inject = [
    '$log', '$location', '$routeParams', '$rootScope',
    'LoginUtils', 'TestUtils'
  ];

  function TestBuildController($log, $location, $routeParams, $rootScope,
                               LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.newQuestionIconURL = './assests/images/ic_add_black_18px.svg';
    var testId = $routeParams.testId;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      TestUtils.getTest(testId)
          .then(function (ok) {
            vm.test = ok;
            vm.test.name = vm.test.name ? vm.test.name : 'Назва тесту';

            var nowDate = new Date();
            nowDate.setHours(0, 0, 0, 0);
            nowDate.setMinutes(vm.test.time / 60);
            nowDate.setSeconds(vm.test.time % 60);
            vm.test.time = nowDate;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.init().TestUtils.getTest()', err);
            $rootScope.notification(err);
          });
    }

    vm.editTestTitle = function (newTitle) {
      if (!newTitle) { return vm.test.name = 'Назва тесту' }

      vm.test.name = newTitle;
    };

    vm.updateTestInfo = function () {
      vm.loading = true;
      vm.test.time = (vm.test.time.getMinutes() * 60) + vm.test.time.getSeconds();

      TestUtils.updateTestInfo(vm.test)
          .then(function (ok) {
            init();
          }, function (err) {
            $log.log('[ERROR] TestBuildController.editTestTitle().TestUtils.updateTestInfo()', err);
            $rootScope.notification(err);
          });
    };

    vm.addQuestion = function () {
      vm.loading = true;

      TestUtils.createQuestion(testId)
          .then(function (ok) {
            var path = '/test/' + testId + '/question/' + ok.code;
            $location.path(path);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.addQuestion(). TestUtils.createQuestion()', err);
            $rootScope.notification(err);
          });
    };

    vm.updateQuestion = function (question) {
      var path = '/test/' + testId + '/question/' + question.code;
      $location.path(path);
    };
  }
})();
