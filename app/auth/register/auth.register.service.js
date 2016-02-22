(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('RegisterUtils', RegisterUtils);

  RegisterUtils.$inject = [
    '$q', '$http',
    '$auth'
  ];

  function RegisterUtils($q, $http,
                         $auth) {
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

    function getFaculties() {
      var deferred = $q.defer();
      var faculties = [
        {
          title: 'fotius',
          id: 1
        },
        {
          title: 'fotius1',
          id: 2
        },
        {
          title: 'fotius2',
          id: 3
        },
        {
          title: 'fotius3',
          id: 4
        }
      ];


      deferred.resolve(faculties);
      return deferred.promise;
    }

    return service;
  }
})();
