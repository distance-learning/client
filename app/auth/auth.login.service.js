(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('LoginUtils', LoginUtils);

  LoginUtils.$inject = [
    '$q', '$http',
    '$auth', 'server_host'
  ];

  function LoginUtils($q, $http,
                      $auth, server_host) {
    var service = {
      login: login,
      logout: logout,
      isLogged: isLogged,
      signUp: signUp
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

    function signUp(value) {
      var deferred = $q.defer();
      var user = {
        name: value.name,
        surname: value.surname,
        password: value.password,
        password_confirmation: value.password_confirmation,
        phone: value.phone,
        email: value.email
      };

      $auth.signup(user)
          .then(function (ok) {
            deferred.resolve(ok);
          })
          .catch(function (err) {
            deferred.reject(err);
          });

      return deferred.promise;
    }

    return service;
  }
})();
