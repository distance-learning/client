(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('RegisterUtils', RegisterUtils);

  RegisterUtils.$inject = [
    '$q',
    '$auth'
  ];

  function RegisterUtils($q,
                      $auth) {
    var service = {
      signUp: signUp
    };

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
