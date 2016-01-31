(function () {
  'use strict';

  angular
      .module('distanceLearning.auth')
      .factory('ResetPassUtils', ResetPassUtils);

  ResetPassUtils.$inject = [
    '$q', '$http',
    'server_host'
  ];

  function ResetPassUtils($q, $http,
                          server_host) {
    var service = {
      resetPassword: resetPassword
    };

    function resetPassword(user) {
      var defer = $q.defer();

      $http.post(server_host + 'api/auth/reset-password', user)
          .success(function (ok) {
            defer.resolve(ok);
          })
          .error(function (err) {
            defer.reject(err);
          });

      return defer.promise;
    }

    return service;
  }
})();
