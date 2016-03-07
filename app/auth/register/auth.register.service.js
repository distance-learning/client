(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('RegisterUtils', RegisterUtils);

  RegisterUtils.$inject = [
    '$q', '$http',
    '$auth', 'server_host'
  ];

  function RegisterUtils($q, $http,
                         $auth, server_host) {
    var service = {
      signUp: signUp,
      getFaculties: getFaculties
    };

    function signUp(value) {
      var deferred = $q.defer();
      var user = {
        name: value.name,
        surname: value.surname,
        password: value.password,
        password_confirmation: value.password_confirmation,
        phone: value.phone,
        email: value.email,
        faculty_id: value.faculty_id
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

    function getFaculties() {
      var defer = $q.defer();

      $http.get(server_host + 'api/auth/faculties')
          .success(function (ok, status, headers, config) {
            defer.resolve(ok);
          })
          .error(function (err, status, headers, config) {
            debugger;
            defer.reject(err);
          });


      return defer.promise;
    }

    return service;
  }
})();
