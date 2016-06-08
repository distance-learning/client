(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('ResetPassController', ResetPassController);

  ResetPassController.$inject = [
    '$location', '$log', '$rootScope',
    'ResetPassUtils'
  ];

  function ResetPassController($location, $log, $rootScope,
                               ResetPassUtils) {
    var vm = this;
    vm.loading = true;
    vm.loadingResetPass = false;

    vm.resetPass = function (user) {
      vm.loadingResetPass = true;

      ResetPassUtils.resetPassword(user)
          .then(function (ok) {
            $rootScope.notification('На пошту [' + user.email + '] відправлено лист з підтвердженням зміни паролю');

            $location.path('/login');
          }, function (err) {
            vm.loadingResetPass = false;

            $rootScope.notification(err);
            $log.log('[ERROR] ResetPassController.resetPass().ResetPassUtils.resetPassword()', err);
          });
    };
  }
})();
