(function () {
  'use strict';

  angular
      .module('distanceLearning.profile')
      .controller('ProfileResetPassController', ProfileResetPassController);

  ProfileResetPassController.$inject = [
    '$log', '$location', '$mdToast', '$routeParams',
    'ProfileUtils', 'LoginUtils'
  ];

  function ProfileResetPassController($log, $location, $mdToast, $routeParams,
                                      ProfileUtils, LoginUtils) {
    var vm = this;
    vm.loading = true;
    vm.user = {};

    init();
    function init() {
      vm.loading = true;

      if ($routeParams.token) { return sendConfirmation($routeParams.token); }
      if (!LoginUtils.isLogged()) { return $location.path('/home'); }

      ProfileUtils.getUserInfo()
          .then(function (ok) {
            vm.user = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('[ERROR] ProfileResetPassController.init().ProfileUtils.getUserInfo()', err);
          });
    }

    function goToProfile() {
      var path = '/home';

      if (vm.user.role == 'admin') { path = '/profile/admin'; }
      if (vm.user.role == 'teacher') { path = '/profile/teacher'; }
      if (vm.user.role == 'student') { path = '/profile/student'; }

      return $location.path(path);
    }

    function credentialsCorrect(user) {
      var result = false;

      if (user.password === user.password_confirmation) { result = true; }

      return result;
    }

    function showError(message) {
      $mdToast.show(
          $mdToast.simple()
              .textContent(message)
              .hideDelay(3000)
      );
    }

    function sendConfirmation(token) {
      ProfileUtils.sendConfirmation(token)
          .then(function (ok) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent('Password was change')
                    .hideDelay(3000)
            );
            $location.path('/home');
          }, function (err) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(err)
                    .hideDelay(3000)
            );
          });
    }

    vm.cancel = function () {
      return goToProfile();
    };

    vm.resetPass = function (user) {
      if (!credentialsCorrect(user)) {
        var msg = 'The passwords entered do not match the password must match both spellings';

        return showError(msg);
      }

      ProfileUtils.userResetPassword(user)
          .then(function (ok) {
            goToProfile();
          }, function (err) {
            $log.log('[ERROR] ', err);
          });
    };
  }
})();