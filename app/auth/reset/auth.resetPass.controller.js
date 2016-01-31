(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('ResetPassController', ResetPassController);

  ResetPassController.$inject = [
    '$location', '$log',
    'ResetPassUtils'
  ];

  function ResetPassController($location, $log,
                               ResetPassUtils) {
    var vm = this;
    vm.loading = true;

    vm.resetPass = function (user) {
      ResetPassUtils.resetPassword(user)
          .then(function (ok) {
            $location.path('/login');
          }, function (err) {
            $log.log('[ERROR] ResetPassController.resetPass().ResetPassUtils.resetPassword()', err);
          });
    };
  }
})();
