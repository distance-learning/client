(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildController', TestBuildController);

  TestBuildController.$inject = [
    '$log', '$location',
    'ProfileUtils', 'LoginUtils', 'TestUtils', 'ProfileTeacherUtils'
  ];

  function TestBuildController($log, $location,
                               ProfileUtils, LoginUtils, TestUtils, ProfileTeacherUtils) {
    var vm = this;
    vm.loading = true;
    vm.times = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
    vm.test = {
      title: 'Назва тесту',
      date: new Date()
    };

    init();
    function init() {
      vm.loading = true;
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;

            ProfileTeacherUtils.getGroups(vm.user)
                .then(function (ok) {
                  vm.groups = ok;

                  vm.loading = false;
                }, function (err) {
                  $log.log('[ERROR] TestBuildController.init().ProfileUtils.getUserInfo().ProfileTeacherUtils.getFaculties().ProfileTeacherUtils.getGroups()', err);
                });
            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.init().ProfileUtils.getUserInfo()', err);
            $location.path('/home');
          });
    }

    vm.editTestTitle = function (newTitle) {
      if (!newTitle) { vm.test.title = 'Назва тесту' }
      else { vm.test.title = newTitle; }
    };
  }
})();