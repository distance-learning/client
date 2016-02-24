(function () {
  'use strict';

  angular
      .module('distanceLearning.test')
      .controller('TestBuildController', TestBuildController);

  TestBuildController.$inject = [
    '$log', '$location', '$mdSidenav',
    'ProfileUtils', 'ProfileTeacherUtils', 'LoginUtils'
  ];

  function TestBuildController($log, $location, $mdSidenav,
                                    ProfileUtils, ProfileTeacherUtils, LoginUtils) {
    var vm = this;
    vm.loading = true;

    init();
    function init() {
      vm.loading = true;

      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] TestBuildController.init().ProfileUtils.getUserInfo()', err);
            $location.path('/home');
          });

    }
  }
})();