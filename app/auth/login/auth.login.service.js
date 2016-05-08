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
      getToken: getToken
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
      $http.get(server_host + 'api/account/logout')
          .then(function () {
            $auth.logout();
          });
    }

    function isLogged() {
      return $auth.isAuthenticated();
    }

    function getToken() {
      return $auth.getToken();
    }

    return service;
  }
})();
