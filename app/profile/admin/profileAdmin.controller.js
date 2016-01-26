(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileAdminController', ProfileAdminController);

  ProfileAdminController.$inject = [
      'LoginUtils', 'ProfileUtils'
  ];

  function ProfileAdminController(LoginUtils, ProfileUtils) {
    var vm = this;
    vm.loading = true;

    init();
    function init() {
      vm.user = {};
      vm.loading = true;
      if (LoginUtils.isLogged()) {
        ProfileUtils.getUserInfo()
            .then(function (ok) {

              if (ok.role != 'admin') { return $location.path('/home'); }

              vm.loading = false;
            }, function (err) {
              $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
            });
      } else {
        $location.path('/home');
      }
    }
  }
})();