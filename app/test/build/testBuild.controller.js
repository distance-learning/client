(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildController', TestBuildController);

  TestBuildController.$inject = [
    '$log', '$location', '$routeParams',
    'LoginUtils', 'TestUtils'
  ];

  function TestBuildController($log, $location, $routeParams,
                               LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;
    vm.times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    vm.newQuestionIconURL = './assests/images/ic_add_black_18px.svg';
    var testId = $routeParams.testId;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      TestUtils.getTest(testId)
          .then(function (ok) {
            vm.test = ok;
            vm.test.name = 'Назва тесту';

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.init().TestUtils.getTest()', err);
          });
    }

    vm.editTestTitle = function (newTitle) {
      if (!newTitle) { return vm.test.name = 'Назва тесту' }

      vm.test.name = newTitle;
    };

    vm.addQuestion = function () {
      vm.loading = true;

      TestUtils.createQuestion(testId)
          .then(function (ok) {
            console.log(ok);

            var path = '/test/' + testId + '/question/' + ok.code;
            $location.path(path);

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.addQuestion(). TestUtils.createQuestion()', err);
          });
    };
  }
})();
