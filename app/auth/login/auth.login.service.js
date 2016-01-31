(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('LoginUtils', LoginUtils);

  LoginUtils.$inject = [
    '$q',
    '$auth'
  ];

  function LoginUtils($q,
                      $auth) {
    var service = {
      login: login,
      logout: logout,
      isLogged: isLogged
    };

    function login(user) {
      var defer = $q.defer();

      $auth.login(user)
          .then(function (ok) {
            defer.resolve(ok);
          }, function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function logout() {
      // TODO: go to server & logout

      $auth.logout();
    }

    function isLogged() {
      return $auth.isAuthenticated();
    }

    return service;
  }
})();
