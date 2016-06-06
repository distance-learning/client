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
    vm.tests = {
      data: [],
      total: 10
    };
    vm.params = {
      page: 1,
      count: 10
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      getTest(vm.params);
    }

    getTest(vm.params);
    function getTest(params) {
      vm.loading = true;
      TestUtils.getTests(params)
          .then(function (ok) {
            vm.tests.data = ok.data;
            vm.tests.total = ok.total;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestPassController.init().TestUtils.getTest()', err);
          });
    }

    vm.goToTestPage = function (test) {
      var path = '/test/' + test.code + '/edit';
      $location.path(path);
    };

    vm.jumpToPage = function (page) {
      vm.params.page = page;

      getTest(vm.params);
    };

    vm.range = function (page) {
      if (!page) { return new Array(1); }

      var countPage = Math.floor(page / vm.params.count);
      if ((page % vm.params.count) != 0) {
        countPage++;
      }

      return new Array(countPage);
    };
  }
})();