(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .controller('RegisterController', RegisterController);

  RegisterController.$inject = [
    '$log', '$location', '$rootScope',
    'RegisterUtils'
  ];

  function RegisterController($log, $location, $rootScope,
                              RegisterUtils) {
    var vm = this;
    vm.loading = true;
    vm.loadingLogin = true;

    init();
    function init() {
      vm.loading = true;

      RegisterUtils.getFaculties()
          .then(function (ok) {
            vm.faculty = ok;

            vm.loading = false;
          }, function (err) {
            $log.log('{ERROR} RegisterController.init().RegisterUtils.getFaculties()', err);
          });
    }

    vm.register = function (user) {
      vm.loadingLogin = false;

      if (!isValidUser(user)) {
        vm.loadingLogin = true;

        return $log.log('[VALIDATION] User date isn`t valid');
      }

      RegisterUtils.signUp(user)
          .then(function () {
            $location.path('/home');
          }, function (err) {
            $log.log('[ERROR] RegisterController.register().RegisterUtils.signUp()', err);
            for (var i in err.data) {
              if (angular.isArray(err.data[i])) {
                for (var j in err.data[i]) {
                  $rootScope.notification(err.data[i][j]);
                }
              } else
                $rootScope.notification(err.data[i]);
            }

            vm.loadingLogin = true;
          })
    };

    function isValidUser(user) {
      return user.password === user.password_confirmation;
    }
  }
})();
