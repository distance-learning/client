(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('LoginUtils', LoginUtils);

  LoginUtils.$inject = [
    '$http', '$q', 'server_host',
    'SessionUtils'];

  function LoginUtils($http, $q, server_host,
                      SessionUtils) {
    var service = {
      login: login,
      isLogged: isLogged,
      register: register
    };

    function login(user) {
      var defer = $q.defer();

      $http.post(server_host + 'api/users/authenticate', { email: user.email, password: user.password })
          .success(function (ok) {
            var userId = ok._id;

            if (userId) {
              SessionUtils.setUser('user', userId);
              defer.resolve(ok);
            }
          })
          .error(function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    function isLogged() {
      return !!SessionUtils.getUser('user');
    }

    function register(value) {
      var deferred = $q.defer();

      $http.post(server_host + 'api/auth/registration', {
        name: value.name,
        surname: value.surname,
        password: value.password,
        password_confirmation: value.password_confirmation,
        phone: value.phone,
        email: value.email
      })
          .success(function (ok) {
            deferred.resolve(ok);
          })
          .error(function (err) {
            deferred.reject(err);
          });

      return deferred.promise;
    }

    return service;
  }
})();