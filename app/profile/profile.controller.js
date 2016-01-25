(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
    '$log', '$location',
    'LoginUtils'
  ];

  function ProfileController($log, $location,
                             LoginUtils) {
    var vm = this;
    vm.loading = true;
    vm.user = {};

    LoginUtils.userProfile()
        .then(function (ok) {
          vm.user = ok;
          vm.loading = false;

          var path = '';
          if (vm.user.role == 'admin') { path = '/profile/admin'; }
          if (vm.user.role == 'student') { path = '/profile/student'; }

          $location.path(path);
        }, function (err) {
          $log.log('[ERROR] ProfileController.LoginUtils.userProfile()', err);
        });
  }
})();
