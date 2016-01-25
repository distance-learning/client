(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileAdminController', ProfileAdminController);

  ProfileAdminController.$inject = [
    '$log',
    'LoginUtils'
  ];

  function ProfileAdminController($log,
                                  LoginUtils) {
    var vm = this;
    vm.loading = true;

    LoginUtils.userProfile()
        .then(function (ok) {
          vm.user = ok;
          vm.loading = false;
        }, function (err) {
          $log.log('[ERROR] ProfileStudentController.LoginUtils.userProfile()', err);
        });
  }
})();