(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('ResetPassController', ResetPassController);

  ResetPassController.$inject = [
    '$location', '$log',
    '$mdToast',
    'ResetPassUtils'
  ];

  function ResetPassController($location, $log,
                               $mdToast,
                               ResetPassUtils) {
    var vm = this;
    vm.loading = true;
    vm.loadingResetPass = false;

    vm.resetPass = function (user) {
      vm.loadingResetPass = true;

      ResetPassUtils.resetPassword(user)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('На пошту [' + user.email + '] відправлено лист з підтвердженням зміни паролю')
                    .hideDelay(3000)
            ).then(function () {
              vm.loadingResetPass = false;

              $location.path('/login');
            });
          }, function (err) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(err)
                    .hideDelay(3000)
            );
            vm.loadingResetPass = false;
            $log.log('[ERROR] ResetPassController.resetPass().ResetPassUtils.resetPassword()', err);
          });
    };
  }
})();
