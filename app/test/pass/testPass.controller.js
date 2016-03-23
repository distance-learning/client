(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestPassController', TestPassController);

  TestPassController.$inject = [
    '$log', '$location', '$routeParams',
    'LoginUtils', 'TestUtils'
  ];

  function TestPassController($log, $location, $routeParams,
                              LoginUtils, TestUtils) {
    var vm = this;
    var testId = $routeParams.testId;
    vm.loading = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      TestUtils.getTest(testId)
          .then(function (ok) {
            vm.test = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }
  }
})();