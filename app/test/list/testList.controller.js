(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestListController', TestListController);

  TestListController.$inject = [
    '$log', '$location',
    'LoginUtils', 'TestUtils'
  ];

  function TestListController($log, $location,
                              LoginUtils, TestUtils) {
    var vm = this;
    vm.loading = true;

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      TestUtils.getTests()
          .then(function (ok) {
            vm.tests = ok.data;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }
  }
})();