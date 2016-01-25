(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileController', ProfileController);

  ProfileController.$inject = [
      '$log',
      'ProfileUtils'
  ];

  function ProfileController($log,
                             ProfileUtils) {
    var vm = this;
    vm.loading = true;

    ProfileUtils.getUserInfo()
        .then(function (ok) {
          console.log(ok);
          vm.user = ok;
          vm.loading = false;
        }, function (err) {
          $log.log('[ERROR] ProfileController.ProfileUtils.getUserInfo()', err);
        });
  }
})();